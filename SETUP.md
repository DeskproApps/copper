# Copper Setup Instructions

Follow these steps to install and configure the Copper app using either an API key or OAuth credentials.

## Using An API Key

To install the Copper App, you must first, on the copper website, head on to the settings tab on the left, and click on API Keys under Integration.

[![](/docs/assets/setup/copper_page.png)](/docs/assets/setup/copper_page.png)

Click on generate API Key, and copy the API Key and API Secret.

Then, on the Deskpro Copper App Install page, head on to Settings and paste the api settings on the API Key field.

After that, insert the email address associated with the account that the API Key belongs to in the API Key Owner Email field, and click install.

## Using OAuth

To install the Copper app using OAuth, you’ll need to request OAuth credentials from Copper. For more information, visit [Copper's OAuth page](https://developer.copper.com/introduction/oauth/index.html). When requesting your credentials, be sure to provide the callback URL from the settings drawer in Deskpro. Once you’ve obtained your credentials, enter the `client_id` and `client_secret` into the settings drawer in Deskpro, then click **Install**.
