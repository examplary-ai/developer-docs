# Custom domains

In enterprise plan workspaces, admins can set a custom domain for the workspace. This allows users to access the workspace
using a custom URL instead of the default `app.examplary.ai` domain. For example, if your school owns the domain `example.edu`,
you can set up a custom domain like `examplary.example.edu` for your workspace.

## Setting up a custom domain

To set up a custom domain for your workspace, follow these steps:

1. In the Examplary dashboard, go to "Account".
2. Click on "Access & domains" in the sidebar.
3. Enter your desired custom domain in the "Custom domain" field. For example, `examplary.example.edu`.

You'll be prompted to add a CNAME record to your domain's DNS settings.
This CNAME record should point your custom domain to `custom-domains.examplary.ai`.

Once completed, you can click to verify.

## Troubleshooting

### Verification fails

DNS changes can take some time to propagate. If verification fails, please wait a few hours and try again.

If you continue to experience issues, please reach out to our support team for assistance.

### Stuck in 'Provisioning' state

Once your domain is validated, it may take up to 24 hours for the custom domain to be fully provisioned.
In the background, Examplary will be setting up DNS records and an SSL certificate for your custom domain.

During this time, you may see a "Provisioning" status in the dashboard. If it remains in this state for
an extended period, please contact support for help.
