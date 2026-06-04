import nodemailer from "nodemailer";

const WEBSITE_URL = "https://whitewolfinfra.com/";
const LOGO_URL = "https://whitewolfinfra.com/logo/whitewolflogo.png";

function escapeHtml(value = "") {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function humanizeKey(key = "") {
	return key
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/[_.-]+/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.replace(/^./, (char) => char.toUpperCase());
}

function getTransporter() {
	const smtpService = (process.env.SMTP_SERVICE || "").trim();
	const rawHost = (process.env.SMTP_HOST || "").trim();
	// Some local SMTP servers listen on IPv4 only. Avoid Node resolving localhost to ::1.
	const host = rawHost === "localhost" ? "127.0.0.1" : rawHost;
	const port = Number(process.env.SMTP_PORT || 587);
	const user = (process.env.SMTP_USER || "").trim();
	const pass = (process.env.SMTP_PASS || "").trim();

	if (!user || !pass) {
		throw new Error("SMTP configuration missing: SMTP_USER and SMTP_PASS are required.");
	}

	if (!smtpService && !host) {
		throw new Error("SMTP configuration missing: set SMTP_HOST (or SMTP_SERVICE).");
	}

	const baseConfig = {
		connectionTimeout: 10000,
		greetingTimeout: 10000,
		socketTimeout: 15000,
		auth: { user, pass },
	};

	if (smtpService) {
		return nodemailer.createTransport({
			service: smtpService,
			secure: port === 465,
			...baseConfig,
		});
	}

	return nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		...baseConfig,
	});
}

export async function POST(req) {
	try {
		const body = await req.json();

		const name = (body?.name || "").trim();
		const email = (body?.email || "").trim();
		const phone = (body?.phone || "").trim();
		const message = (body?.message || "").trim();
		const requestHeading = (body?.requestHeading || body?.subject || body?.requestType || "General Website Enquiry").trim();
		const keyRequest = (body?.keyRequest || message || "Not provided").trim();
		const source = (body?.source || "Website Form").trim();
		const metadata = body?.metadata || {};

		const knownKeys = new Set([
			"name",
			"email",
			"phone",
			"message",
			"requestHeading",
			"subject",
			"requestType",
			"keyRequest",
			"source",
			"metadata",
		]);

		const automaticFields = Object.fromEntries(
			Object.entries(body || {}).filter(([key, value]) => {
				if (knownKeys.has(key)) return false;
				if (value === undefined || value === null) return false;
				return String(value).trim() !== "";
			}),
		);

		const extraFields = {
			...metadata,
			...automaticFields,
		};

		if (!name) {
			return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
		}

		if (!phone) {
			return Response.json({ ok: false, error: "Phone is required" }, { status: 400 });
		}

		if (!email && !message) {
			return Response.json(
				{ ok: false, error: "Either email or message is required" },
				{ status: 400 },
			);
		}

		const transporter = getTransporter();

		const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;
		const adminEmail = process.env.MAIL_TO || "whitewolfinfra@gmail.com";
		const subject = `[WhiteWolfInfra] ${requestHeading}`;

		const metadataRows = Object.entries(extraFields)
			.filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
			.map(([key, value]) => `<tr><td style=\"padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#3f3f46;font-size:13px;background:#fafafa;\"><strong>${escapeHtml(humanizeKey(key))}</strong></td><td style=\"padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111111;font-size:13px;word-break:break-word;\">${escapeHtml(String(value))}</td></tr>`)
			.join("");

		const extraFieldsText = Object.entries(extraFields)
			.filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
			.map(([key, value]) => `${humanizeKey(key)}: ${String(value)}`)
			.join("\n");

		await transporter.sendMail({
			from: `White Wolf Infra <${mailFrom}>`,
			to: adminEmail,
			replyTo: email || undefined,
			subject,
			text: [
				`Source: ${source}`,
				`Request Heading: ${requestHeading}`,
				`Key Request: ${keyRequest}`,
				"",
				`Name: ${name}`,
				`Phone: ${phone}`,
				`Email: ${email || "Not provided"}`,
				`Message: ${message || "Not provided"}`,
				extraFieldsText ? "" : "",
				extraFieldsText ? "Additional Details:" : "",
				extraFieldsText,
				`Website: ${WEBSITE_URL}`,
			].join("\n"),
			html: `
				<div style="background:#f5f5f5;padding:28px 14px;font-family:'DM Sans','Segoe UI',Tahoma,Arial,sans-serif;color:#111111;">
					<div style="max-width:760px;width:100%;margin:0 auto;background:#ffffff;border:1px solid #dddddd;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.09);">
						<div style="padding:22px 22px 18px;background:linear-gradient(145deg,#0f0f0f 0%,#1c1c1c 65%,#2a2a2a 100%);color:#ffffff;position:relative;">
							<div style="text-align:center;margin:0 0 14px;position:relative;z-index:1;">
								<div style="display:inline-block;background:#ffffff;padding:10px 14px;border-radius:12px;border:1px solid #e5e5e5;box-shadow:0 6px 18px rgba(0,0,0,0.22);">
									<img src="${LOGO_URL}" alt="White Wolf Infra" width="170" style="display:block;width:100%;max-width:170px;height:auto;margin:0 auto;" />
								</div>
							</div>
							<p style="margin:0 0 8px;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;opacity:0.84;font-family:'DM Mono','Courier New',monospace;">White Wolf Infra</p>
							<h2 style="margin:0;font-size:30px;line-height:1.1;font-weight:700;font-family:'Playfair Display','Times New Roman',serif;">New Lead Request</h2>
							<p style="margin:10px 0 0;font-size:13px;opacity:0.9;line-height:1.6;">A new enquiry has arrived from your website.</p>
							<div style="position:absolute;right:14px;top:14px;width:92px;height:92px;border-radius:999px;background:radial-gradient(circle,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.09) 62%,rgba(255,255,255,0) 100%);"></div>
						</div>

						<div style="padding:20px 22px 8px;">
							<div style="display:inline-block;background:#f4f4f5;border:1px solid #d4d4d8;color:#18181b;padding:6px 11px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-family:'DM Mono','Courier New',monospace;">${escapeHtml(source)}</div>
							<h3 style="margin:14px 0 6px;font-size:24px;line-height:1.2;color:#111111;font-family:'Playfair Display','Times New Roman',serif;">${escapeHtml(requestHeading)}</h3>
							<p style="margin:0 0 14px;color:#4b5563;font-size:14px;line-height:1.7;"><strong style="color:#212946;">Key Request:</strong> ${escapeHtml(keyRequest)}</p>

							<div style="border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;background:#fff;">
								<table style="border-collapse:collapse;width:100%;font-size:13px;table-layout:fixed;">
									<tr><td style="width:34%;padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#3f3f46;background:#fafafa;font-weight:700;">Name</td><td style="padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#111111;word-break:break-word;">${escapeHtml(name)}</td></tr>
									<tr><td style="width:34%;padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#3f3f46;background:#fafafa;font-weight:700;">Phone</td><td style="padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#111111;word-break:break-word;">${escapeHtml(phone)}</td></tr>
									<tr><td style="width:34%;padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#3f3f46;background:#fafafa;font-weight:700;">Email</td><td style="padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#111111;word-break:break-word;">${escapeHtml(email || "Not provided")}</td></tr>
									<tr><td style="width:34%;padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#3f3f46;background:#fafafa;font-weight:700;">Message</td><td style="padding:11px 12px;border-bottom:1px solid #e5e7eb;color:#111111;word-break:break-word;">${escapeHtml(message || "Not provided")}</td></tr>
									${metadataRows}
								</table>
							</div>
						</div>

						<div style="padding:14px 22px 20px;color:#52525b;font-size:12px;border-top:1px solid #f1f1f1;background:#fafafa;">
							Submitted via <a href="${WEBSITE_URL}" style="color:#111111;text-decoration:none;font-weight:700;">whitewolfinfra.com</a>
						</div>
					</div>
				</div>
			`,
		});

		let userAckSent = false;

		if (email) {
			await transporter.sendMail({
				from: `White Wolf Infra <${mailFrom}>`,
				to: email,
				subject: "Thank you for contacting White Wolf Infra",
				text: [
					`Hi ${name},`,
					"",
					"Thank you for reaching out to White Wolf Infra.",
					`We have received your request: ${requestHeading}`,
					`Key request noted: ${keyRequest}`,
					"",
					"Our team will get back to you shortly.",
					`Website: ${WEBSITE_URL}`,
				].join("\n"),
				html: `
					<div style="background:#f5f5f5;padding:26px 14px;font-family:'DM Sans','Segoe UI',Tahoma,Arial,sans-serif;color:#111111;">
						<div style="max-width:640px;width:100%;margin:0 auto;background:#ffffff;border:1px solid #dddddd;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.09);">
							<div style="padding:22px;background:linear-gradient(145deg,#0f0f0f 0%,#1c1c1c 65%,#2a2a2a 100%);color:#ffffff;position:relative;">
								<div style="text-align:center;margin:0 0 14px;position:relative;z-index:1;">
									<div style="display:inline-block;background:#ffffff;padding:10px 14px;border-radius:12px;border:1px solid #e5e5e5;box-shadow:0 6px 18px rgba(0,0,0,0.22);">
										<img src="${LOGO_URL}" alt="White Wolf Infra" width="170" style="display:block;width:100%;max-width:170px;height:auto;margin:0 auto;" />
									</div>
								</div>
								<p style="margin:0 0 8px;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;opacity:0.82;font-family:'DM Mono','Courier New',monospace;">White Wolf Infra</p>
								<h2 style="margin:0;font-size:30px;line-height:1.12;font-family:'Playfair Display','Times New Roman',serif;">Thank You, ${escapeHtml(name)}!</h2>
								<div style="position:absolute;right:14px;top:14px;width:92px;height:92px;border-radius:999px;background:radial-gradient(circle,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.09) 62%,rgba(255,255,255,0) 100%);"></div>
							</div>

							<div style="padding:20px 22px 22px;line-height:1.7;">
								<p style="margin:0 0 12px;color:#3f3f46;font-size:14px;">We have received your request at White Wolf Infra. Our team will connect with you shortly.</p>
								<div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:12px;padding:12px 14px;margin-bottom:16px;">
									<p style="margin:0 0 6px;color:#111111;font-size:14px;"><strong>Request Heading:</strong> ${escapeHtml(requestHeading)}</p>
									<p style="margin:0;color:#111111;font-size:14px;"><strong>Key Request:</strong> ${escapeHtml(keyRequest)}</p>
								</div>
								<a href="${WEBSITE_URL}" style="display:inline-block;padding:11px 16px;background:linear-gradient(135deg,#111111,#2a2a2a);color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;letter-spacing:0.02em;">Visit Website</a>
							</div>
						</div>
					</div>
				`,
			});

			userAckSent = true;
		}

		return Response.json({
			ok: true,
			message: "Request submitted successfully",
			userAckSent,
		});
	} catch (error) {
		console.error("Mail API error:", error);
		const isConnectionRefused =
			error?.code === "ESOCKET" &&
			String(error?.message || "").includes("ECONNREFUSED");

		const friendlyError = isConnectionRefused
			? "SMTP server unreachable. Check SMTP_HOST/SMTP_PORT or use provider SMTP (smtp.gmail.com, etc.)."
			: "Unable to send email right now";

		return Response.json(
			{
				ok: false,
				error: friendlyError,
				details: process.env.NODE_ENV === "development" ? String(error) : undefined,
			},
			{ status: 500 },
		);
	}
}
