export function missingEnvVariableUrl(envVarName: string, whereToGet: string) {
  const deployment = deploymentName();
  if (!deployment) return `Missing ${envVarName} in environment variables.`;
  return (
    `\n  Missing ${envVarName} in environment variables.\n\n` +
    `  Get it from ${whereToGet} .\n  Paste it on the Convex dashboard:\n` +
    `  https://dashboard.convex.dev/d/${deployment}/settings?var=${envVarName}`
  );
}

export function deploymentName() {
  const url = process.env.CONVEX_URL;
  if (!url) return undefined;
  const regex = new RegExp("https://(.+).convex.cloud");
  return regex.exec(url)?.[1];
}

export const site = {
  name: "KopaKopa",
  slogan: "Empower Your Finances!",
  description:
    "KopaKopa is a Platform for Financial Planning, Tracking, and Literacy",
  logo: "/logo.png",
  phone: undefined,
  email: "loans@acelords.com",
  emailFrom: "kopakopa@apps.acelords.com",
};
