# Farcaster Mini Apps

## Blog

::blog-posts

## Why Farcaster Doesn't Need OAuth 2.0

OAuth exists to let three separate parties (user → platform → third-party app) establish mutual trust. Farcaster is built on a decentralized architecture
that collapses this triangle:

### 1. Identity & Authentication

- **User-owned keys:** A user controlled crypotgraphic signature proves control of a Farcaster ID—no intermediary.
- **Dev mappings**
  - Sign In with X → Sign-in with Farcaster (SIWF)
  - OAuth 2.0 Authorization Flow → Quick Auth

### 2. Data Access & Permissions

- **Open, replicated data:** Social data like casts, reactions, and profiles live on Snapchain and can be read by anyone.
- **No permission scopes:** Everything is already public; you filter what you need instead of requesting scopes.
- **Zero-cost reads:** Sync the chain yourself or hit a public indexer—no rate caps, no $5k +/month fire-hoses.
- **Cryptographic writes:** Users can delegate a key to applications so the applications can writes on their behalf.
- **Dev mappings**
  - Centralized APIs → Snapchain + infra services (e.g. Neynar)
  - Access token → no equivalent, data is public
  - Write permissions → App Keys

### Builder Takeaways

1. **Skip OAuth flows—wallet signature = auth.**
2. **Forget permission scopes—use filters.**
3. **Enjoy building permissionlessly**

### Resources

- [Quick Auth](https://miniapps.farcaster.xyz/docs/sdk/quick-auth)
- [Neynar SDK for one-call Snapchain queries](https://docs.neynar.com/reference/quickstart)
- [App Keys](https://docs.farcaster.xyz/reference/warpcast/signer-requests)

## Getting Started

import { Caption } from '../../components/Caption.tsx';

### Overview

Mini apps are web apps built with HTML, CSS, and Javascript that can be discovered
and used within Farcaster clients. You can use an SDK to access native
Farcaster features, like authentication, sending notifications, and interacting
with the user's wallet.

### Requirements

Before getting started, make sure you have:

- **Node.js 22.11.0 or higher** (LTS version recommended)
  - Check your version: `node --version`
  - Download from [nodejs.org](https://nodejs.org/)
- A package manager (npm, pnpm, or yarn)

:::warning
If you encounter installation errors, verify you're using Node.js 22.11.0 or higher. Earlier versions are not supported.
:::

### Enable Developer Mode

Developer mode gives you access to tools for Mini Apps, here's how to enable it:

1. Make sure you're logged in to Farcaster on either mobile or desktop
2. Click this link: [https://farcaster.xyz/\~/settings/developer-tools](https://farcaster.xyz/~/settings/developer-tools) on either mobile or desktop.
3. Toggle on "Developer Mode"
4. Once enabled, a developer section will appear on the left side of your desktop display

:::tip
Developer mode unlocks tools for creating manifests, previewing your mini app, auditing your manifests and embeds, and viewing analytics. We recommend using it on desktop for the best development experience.
:::

### Quick Start

For new projects, you can set up an app using the
[@farcaster/create-mini-app](https://github.com/farcasterxyz/miniapps/tree/main/packages/create-mini-app)
CLI. This will prompt you to set up a project for your app.

:::code-group

```bash [npm]
npm create @farcaster/mini-app
```

```bash [pnpm]
pnpm create @farcaster/mini-app
```

```bash [yarn]
yarn create @farcaster/mini-app
```

:::

Remember, you can use whatever your favorite web framework is to build Mini
Apps so if these options aren't appealing you can setup the SDK in your own
project by following the instructions below.

### Manual Setup

For existing projects, install the MiniApp SDK:

#### Package Manager

:::code-group

```bash [npm]
npm install @farcaster/miniapp-sdk
```

```bash [pnpm]
pnpm add @farcaster/miniapp-sdk
```

```bash [yarn]
yarn add @farcaster/miniapp-sdk
```

:::

#### CDN

If you're not using a package manager, you can also use the MiniApp SDK via an
ESM-compatible CDN such as esm.sh. Simply add a `<script type="module">` tag to
the bottom of your HTML file with the following content.

```html
<script type="module">
  import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";
</script>
```

### Making Your App Display

After your app loads, you must call `sdk.actions.ready()` to hide the splash screen and display your content:

```javascript
import { sdk } from "@farcaster/miniapp-sdk";

// After your app is fully loaded and ready to display
await sdk.actions.ready();
```

:::warning
**Important**: If you don't call `ready()`, users will see an infinite loading screen. This is one of the most common issues when building Mini Apps.
:::

### Troubleshooting

#### Node.js Version Issues

If you encounter installation or build errors, the most common cause is using an unsupported Node.js version.

**Common error messages:**

- `npm ERR! engine Unsupported platform`
- `npm ERR! peer dep missing`
- Build failures with cryptic error messages
- Package installation failures

**Solution:**

1. Check your Node.js version:

   ```bash
   node --version
   ```

2. If you're using Node.js \< 22.11.0, update to the latest LTS version:
   - Visit [nodejs.org](https://nodejs.org/) to download the latest LTS
   - Or use a version manager like `nvm`:
     ```bash
     nvm install --lts
     nvm use --lts
     ```

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

### Building with AI

These docs are LLM friendly so that you use the latest models to build your
applications.

1. Use the Ask in ChatGPT buttons available on each page to interact with the
   documentation.

<video autoPlay muted playsInline loop>
  <source src="/ask_in_chatgpt.mp4" type="video/mp4" />

Your browser does not support the video tag.
</video>

2. Use the <a class="vocs_Anchor vocs_Link vocs_Link_accent" href="/llms-full.txt">llms-full.txt</a> to keep your LLM up to date with these docs:

<picture>
  <img alt="setup mini app docs in cursor" src="/cursor-setup.png" width="auto" />
</picture>

<br />

<Caption>
  Adding the Mini App docs to Cursor
</Caption>

#### How does this work?

This entire site is converted into a single markdown doc that can fit inside
the context window of most LLMs. See [The /llms.txt file](https://llmstxt.org/)
standards proposal for more information.

### Next Steps

You'll need to do a few more things before distributing your app to users:

1. publish the app by providing information about who created it and how it should displayed
2. make it sharable in feeds

## Specification

A Mini App is a web application that renders inside a Farcaster client.

### Mini App Embed

The primary discovery points for Mini Apps are social feeds. Mini App Embeds
are an OpenGraph-inspired metadata standard that lets any page in a Mini App
be rendered as a rich object that can launch user into an application.

![mini app embed](/embed_schematic.png)

#### Versioning

Mini App Embeds will follow a simple versioning scheme where non-breaking
changes can be added to the same version but a breaking change must accompany a
version bump.

#### Metatags

A Mini App URL must have a MiniAppEmbed in a serialized form in the `fc:miniapp` meta tag in the HTML `<head>`. For backward compatibility, the `fc:frame` meta tag is also supported. When this URL is rendered in a cast, the image is displayed in a 3:2 ratio with a button underneath. Clicking the button will open a Mini App to the provided action url and use the splash page to animate the transition.

```html
<meta name="fc:miniapp" content="<stringified Embed JSON>" />
<!-- For backward compatibility -->
<meta name="fc:frame" content="<stringified Embed JSON>" />
```

#### Schema

| Property | Type   | Required | Description             | Constraints                                    |
| -------- | ------ | -------- | ----------------------- | ---------------------------------------------- |
| version  | string | Yes      | Version of the embed.   | Must be "1"                                    |
| imageUrl | string | Yes      | Image url for the embed | Max 1024 characters. Must be 3:2 aspect ratio. |
| button   | object | Yes      | Button                  |                                                |

##### Button Schema

| Property | Type   | Required | Description    | Constraints                 |
| -------- | ------ | -------- | -------------- | --------------------------- |
| title    | string | Yes      | Mini App name. | Max length 32 characters    |
| action   | object | Yes      | Action         | Max length 1024 characters. |

##### Action Schema

| Property              | Type   | Required | Description                                                                        | Constraints                                  |
| --------------------- | ------ | -------- | ---------------------------------------------------------------------------------- | -------------------------------------------- |
| type                  | string | Yes      | The type of action.                                                                | One of: `launch_frame`, `view_token`         |
| url                   | string | No       | App URL to open. If not provided, defaults to full URL used to fetch the document. | Max length 1024 characters.                  |
| name                  | string | No       |                                                                                    | Name of the application                      |
| splashImageUrl        | string | No       | URL of image to show on loading screen.                                            | Max length 32 characters. Must be 200x200px. |
| splashBackgroundColor | string | No       | Hex color code to use on loading screen.                                           | Hex color code.                              |

##### Example

```json
{
  "version": "1",
  "imageUrl": "https://yoink.party/framesV2/opengraph-image",
  "button": {
    "title": "🚩 Start",
    "action": {
      "type": "launch_frame",
      "name": "Yoink!",
      "url": "https://yoink.party/framesV2",
      "splashImageUrl": "https://yoink.party/logo.png",
      "splashBackgroundColor": "#f5f0ec"
    }
  }
}
```

### App Surface

![https://github.com/user-attachments/assets/66cba3ca-8337-4644-a3ac-ddc625358390](https://github.com/user-attachments/assets/66cba3ca-8337-4644-a3ac-ddc625358390)

#### Header

Hosts should render a header above the Mini App that includes the name and
author specified in the manifest. Clients should show the header whenever the
Mini App is launched.

#### Splash Screen

Hosts should show a splash screen as soon as the app is launched. The icon
and background must be specified in the Mini App manifest or embed meta tags.
The Mini App can hide the splash screen once loading is complete.

![splash schematic](/splash_screen_schematic.png)

#### Size & Orientation

A Mini App should be rendered in a vertical modal. Mobile Mini App sizes should
be dictated by device dimensions while web Mini App sizes should be set to
424x695px.

### SDK

Mini Apps can communicate with their Host using a JavaScript SDK. At this time
there is no formal specification for the message passing format, Hosts and Apps
should use the open-source NPM packages that can be found in the
[farcasterxyz/miniapps](https://github.com/farcasterxyz/miniapps) repo.

This SDK facilitates communication over a `postMessage` channel available in
iframes and mobile WebViews.

#### Versioning

The SDK is versioned using [Semantic Versioning](https://semver.org/). A
[What's New page](/docs/sdk/changelog) is maintained to communicate developer
impacting changes. A [lower level
changelog](https://github.com/farcasterxyz/miniapps/blob/main/packages/miniapp-sdk/CHANGELOG.md)
is maintained within the code base to document all changes.

#### API

- [context](/docs/sdk/context) - provides information about the context the Mini App is running in

##### Actions

- [addMiniApp](/docs/sdk/actions/add-miniapp) - Prompts the user to add the Mini App
- [close](/docs/sdk/actions/close) - Closes the Mini App
- [composeCast](/docs/sdk/actions/compose-cast) - Prompt the user to cast
- [ready](/docs/sdk/actions/ready) - Hides the Splash Screen
- [signin](/docs/sdk/actions/sign-in) - Prompts the user to Sign In with Farcaster
- [openUrl](/docs/sdk/actions/open-url) - Open an external URL
- [viewProfile](/docs/sdk/actions/view-profile) - View a Farcaster profile
- [viewCast](/docs/sdk/actions/view-cast) - View a specific cast
- [swapToken](/docs/sdk/actions/swap-token) - Prompt the user to swap tokens
- [sendToken](/docs/sdk/actions/send-token) - Prompt the user to send tokens
- [viewToken](/docs/sdk/actions/view-token) - View a token

##### Wallet

- [getEthereumProvider](/docs/sdk/wallet) - [EIP-1193 Ethereum Provider](https://eips.ethereum.org/EIPS/eip-1193)
- [getSolanaProvider](/docs/sdk/solana) - Experimental Solana provider

#### Events

The SDK allows Mini Apps to [subscribe to events](/docs/sdk/events) emitted by the Host.

### Manifest

Mini Apps can publish metadata that allows Farcaster clients to more deeply
integrate with their Mini App. This file is published at
`/.well-known/farcaster.json` and the [Fully Qualified Domain
Name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) where it is
hosted uniquely identifies the Mini App. The Manifest contains data that allows
Farcaster clients to verify the author of the app, present the Mini App in
discovery surfaces like app stores, and allows the Mini App to send
notifications.

#### Versioning

Manifests will follow a simple versioning scheme where non-breaking
changes can be added to the same version but a breaking change must accompany a
version bump.

#### Schema

| Property           | Type   | Required   | Description                                      |
| ------------------ | ------ | ---------- | ------------------------------------------------ |
| accountAssociation | object | ✅ **Yes** | Verifies domain ownership to a Farcaster account |
| miniapp (or frame) | object | ✅ **Yes** | Metadata about the Mini App                      |

##### accountAssociation

The account association verifies authorship of this domain to a Farcaster
account.

The value is set to the JSON representation of a [JSON Farcaster
Signature](https://github.com/farcasterxyz/protocol/discussions/208) from the
account's custody address with the following payload:

```json
{
  domain: string;
}
```

The `domain` value must exactly match the FQDN of where it is hosted.

##### Schema

| Property  | Type   | Required | Description               |
| --------- | ------ | -------- | ------------------------- |
| header    | string | Yes      | base64 encoded JFS header |
| payload   | string | Yes      | base64 encoded payload    |
| signature | string | Yes      | base64 encoded signature  |

##### Example

```json
{
  "header": "eyJmaWQiOjM2MjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgyY2Q4NWEwOTMyNjFmNTkyNzA4MDRBNkVBNjk3Q2VBNENlQkVjYWZFIn0",
  "payload": "eyJkb21haW4iOiJ5b2luay5wYXJ0eSJ9",
  "signature": "MHgwZmJiYWIwODg3YTU2MDFiNDU3MzVkOTQ5MDRjM2Y1NGUxMzVhZTQxOGEzMWQ5ODNhODAzZmZlYWNlZWMyZDYzNWY4ZTFjYWU4M2NhNTAwOTMzM2FmMTc1NDlmMDY2YTVlOWUwNTljNmZiNDUxMzg0Njk1NzBhODNiNjcyZWJjZTFi"
}
```

##### frame

Metadata needed to by Hosts to distribute the Mini App.

import ManifestAppConfigSchema from "../../snippets/manifestAppConfigSchema.mdx"

<ManifestAppConfigSchema />

##### Example

import ManifestAppConfigExample from "../../snippets/manifestAppConfigExample.mdx"

<ManifestAppConfigExample />

#### Example

Example of a valid farcaster.json manifest:

```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjM2MjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgyY2Q4NWEwOTMyNjFmNTkyNzA4MDRBNkVBNjk3Q2VBNENlQkVjYWZFIn0",
    "payload": "eyJkb21haW4iOiJ5b2luay5wYXJ0eSJ9",
    "signature": "MHgwZmJiYWIwODg3YTU2MDFiNDU3MzVkOTQ5MDRjM2Y1NGUxMzVhZTQxOGEzMWQ5ODNhODAzZmZlYWNlZWMyZDYzNWY4ZTFjYWU4M2NhNTAwOTMzM2FmMTc1NDlmMDY2YTVlOWUwNTljNmZiNDUxMzg0Njk1NzBhODNiNjcyZWJjZTFi"
  },
  "miniapp": {
    "version": "1",
    "name": "Yoink!",
    "iconUrl": "https://yoink.party/logo.png",
    "homeUrl": "https://yoink.party/framesV2/",
    "imageUrl": "https://yoink.party/framesV2/opengraph-image",
    "buttonTitle": "🚩 Start",
    "splashImageUrl": "https://yoink.party/logo.png",
    "splashBackgroundColor": "#f5f0ec",
    "webhookUrl": "https://yoink.party/api/webhook"
  }
}
```

#### Caching

Farcaster clients may cache the manifest for a Mini App but should provide a
way for refreshing the manifest file.

### Adding Mini Apps

Mini Apps can be added to their Farcaster client by users. This enables the user
to quickly navigate back to the app and the app to send notifications to the
user.

Mini Apps can prompt the user to add the app during an interaction with the
[addMiniApp](/docs/sdk/actions/add-miniapp) action. Hosts may also let users add Mini
Apps from discovery surfaces like app stores or featured notifications.

Before a user adds a Mini App the Host should display information about the app
and a reminder that the app will be able to notify the user.

When a user adds a Mini App the Host must generate the appropriate Server
Events and send them to the Mini App's `webhookUrl` if one was provided.

After a user adds a Mini App, the Host should make it easy to find and launch
the Mini App by providing a top-level interface where users can browse and open
added apps.

#### Server Events

The Host server POSTs 4 types of events to the Mini App server at the
`webhookUrl` specified in its Mini App manifest:

- `miniapp_added`
- `miniapp_removed`
- `notifications_enabled`
- `notifications_disabled`

The body looks like this:

Events use the [JSON Farcaster
Signature](https://github.com/farcasterxyz/protocol/discussions/208) format and
are signed with the app key of the user. The final format is:

```
{
  header: string;
  payload: string;
  signature: string;
}
```

All 3 values are `base64url` encoded. The payload and header can be decoded to
JSON, where the payload is different per event.

##### miniapp_added

This event may happen when an open frame calls `actions.addMiniApp` to prompt the
user to favorite it, or when the frame is closed and the user adds the frame
elsewhere in the client application (e.g. from a catalog).

Adding a frame includes enabling notifications.

The Host server generates a unique `notificationToken` and sends it
together with the `notificationUrl` that the frame must call, to both the
Host client and the frame server. Client apps must generate unique
tokens for each user.

Webhook payload:

```json
{
  "event": "miniapp_added",
  "notificationDetails": {
    "url": "https://api.farcaster.xyz/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```ts
type EventMiniAppAddedPayload = {
  event: "miniapp_added";
  notificationDetails?: MiniAppNotificationDetails;
};
```

##### miniapp_removed

A user can remove a frame, which means that any notification tokens for that
fid and client app (based on signer requester) should be considered invalid:

Webhook payload:

```json
{
  "event": "miniapp_removed"
}
```

##### notifications_disabled

A user can disable frame notifications from e.g. a settings panel in the client
app. Any notification tokens for that fid and client app (based on signer
requester) should be considered invalid:

Webhook payload:

```json
{
  "event": "notifications_disabled"
}
```

##### notifications_enabled

A user can enable frame notifications (e.g. after disabling them). The client
backend again sends a `notificationUrl` and a `token`, with a backend-only
flow:

Webhook payload:

```json
{
  "event": "notifications_enabled",
  "notificationDetails": {
    "url": "https://api.farcaster.xyz/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```ts
type EventNotificationsEnabledPayload = {
  event: "notifications_enabled";
  notificationDetails: MiniAppNotificationDetails;
};
```

#### Notifications

A Mini App server can send notifications to one or more users who have enabled
them.

The Mini App server is given an authentication token and a URL which they can
use to push a notification to the specific Farcaster app that invoked the Mini
App. This is private and must be done separately for each Farcaster client that
a user may use.

The Mini App server calls the `notificationUrl` with the following JSON body:

import SendNotificationRequestSchema from '../../snippets/sendNotificationRequestSchema.mdx'

<SendNotificationRequestSchema />

The response from the client server must be an HTTP 200 OK with the following JSON body:

import SendNotificationResponseSchema from '../../snippets/sendNotificationResponseSchema.mdx'

<SendNotificationResponseSchema />

Once a user has been notified, when clicking the notification the client app will:

- Open `targetUrl`
- Set the context to the notification, see `NotificationLaunchContext`

##### Idempotency

A host MUST deduplicate notification requests using `(FID, notificationId)` as
an idempotency that is valid 24 hours. This allows Apps to safely retry
notification requests.

##### Rate Limits

Host servers should impose rate limits per `token` to prevent intentional or accidentally abuse. The recommended rate limits are:

- 1 notification per 30 seconds per `token`
- 100 notifications per day per `token`

##### Displaying notifications

Hosts should display a user's Mini App notifications from their UI as follows:

![notifications schematic](/notification_schematic.png)

##### Controls

Hosts should provide controls for the user to toggle their notification
settings for their apps.

- Users should be able to navigate to settings for any Mini App they've added
  and be able to enable or disable notifications from this menu
- Users should be able to disable notifications for a Mini App directly from a
  notification from that Mini App

import { ManifestSchemaRenderer, SchemaRenderer } from '../../../components/ManifestRender.tsx'
import { domainManifestSchema } from '@farcaster/miniapp-sdk'

### Purpose

You are an AI agent helping developers troubleshoot Farcaster Mini Apps. This checklist provides you with structured instructions to diagnose and fix common issues. Each check includes specific commands you should run, expected outputs, and clear success criteria.

### General Guidelines

As an AI agent, follow these guidelines:

- **Ask clarifying questions** until you have high confidence in the task. Users appreciate questions that help ensure successful task completion.
- **Be specific** when something is unclear or inaccessible. Ask for file paths, URLs, or specific error messages.
- **Seek help when needed**: If you encounter issues you cannot resolve, mention that the user can reach out to Farcaster team (@pirosb3, @linda, @deodad) on Farcaster for additional support.
- **Verify assumptions** before making changes. It's better to confirm than to proceed with uncertainty.

### Common LLM Pitfalls

When helping developers with Mini Apps:

- **DO NOT** reference Frames v1 syntax or fields like `fc:frame:image`, `fc:frame:button`
- **DO NOT** invent manifest fields not in the official schema
- **DO NOT** mix Frame and Mini App terminology (Mini Apps are not Frames)
- **DO NOT** use outdated examples from before 2024
- **ALWAYS** verify fields against the official SDK schema at `@farcaster/miniapp-sdk`
- **ALWAYS** use the official documentation at miniapps.farcaster.xyz
- **ALWAYS** check that examples use `miniapp` or `frame` (not `frames`) in manifest

If using example code, ensure it's from:

- Official Mini Apps documentation (this site)
- The @farcaster/miniapp-sdk package
- Examples that use `"version": "1"` not `"version": "next"`

### Prerequisites

Before you begin troubleshooting, ensure the developer understands:

- [What Mini Apps are](/docs/getting-started)
- [How manifests work](/docs/specification#manifest)
- [SDK actions and capabilities](/docs/sdk/actions/ready)

---

### Check 1: Manifest Configuration

#### 1.1 Verify Manifest Accessibility

**Command:**

```bash
curl -s https://{domain}/.well-known/farcaster.json
```

**Expected Output:**

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "frame": {
    "version": "1",
    "name": "App Name",
    "iconUrl": "https://...",
    "homeUrl": "https://..."
  }
}
```

**Success Criteria:**

- HTTP 200 response
- Valid JSON format
- Contains `accountAssociation` object
- Contains `frame` object with required fields

**If Check Fails:**

<details>
  <summary>Manifest not found (404)</summary>

**Decision Flow:**

```
Is hosting available?
├─ Yes: Use hosted manifest
│   └─ Direct to: https://farcaster.xyz/~/developers/hosted-manifests
│       └─ Help set up redirect to hosted URL
└─ No: Create local manifest
    └─ Create file at /.well-known/farcaster.json
```

**For Vercel redirect:**

```json
{
  "redirects": [
    {
      "source": "/.well-known/farcaster.json",
      "destination": "https://api.farcaster.xyz/miniapps/hosted-manifest/{manifest-id}",
      "permanent": false
    }
  ]
}
```

</details>

<details>
  <summary>Manifest exists but unsigned</summary>

**Action:** Direct the user to sign the manifest

- Tool: [https://farcaster.xyz/\~/developers/mini-apps/manifest?domain=\{their-domain}](https://farcaster.xyz/~/developers/mini-apps/manifest?domain={their-domain})
- The user must provide the signed `accountAssociation` object
- Update the manifest with signed data
</details>

#### 1.2 Validate Manifest Schema

**Valid Manifest Example:**

<ManifestSchemaRenderer />

#### 1.3 Verify Domain Signature

**Validation Steps:**

1. Decode the base64url `payload` from `accountAssociation.payload`
2. Extract the `domain` field
3. Verify domain matches where manifest is hosted

**Example:**

```javascript
// If hosted at www.example.com
const payload = JSON.parse(atob(accountAssociation.payload));
// payload.domain should be "www.example.com" (including subdomain)
```

**Important:** The signed domain must match exactly, including subdomains.

---

### Check 2: Embed Metadata

#### 2.1 Verify Embed Tags on Entry Points

**What to check:**

- Root URL of the mini app
- All shareable pages (products, profiles, content)

**Command:**

```bash
curl -s https://{domain}/{path} | grep -E 'fc:miniapp|fc:frame'
```

**Expected Output:**

```html
<meta
  name="fc:miniapp"
  content='{"version":"1","imageUrl":"...","button":{...}}'
/>
```

#### 2.2 Validate Embed Structure

**For Next.js Applications:**

```typescript
// app/layout.tsx or pages with generateMetadata
import { Metadata } from "next";

const frame = {
  version: "1", // Not "next" - must be "1"
  imageUrl: "https://example.com/og-image.png", // 3:2 aspect ratio
  button: {
    title: "Open App", // Max 32 characters
    action: {
      type: "launch_frame",
      name: "My Mini App",
      url: "https://example.com", // Optional, defaults to current URL
      splashImageUrl: "https://example.com/icon.png", // 200x200px
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "My Mini App",
    openGraph: {
      title: "My Mini App",
      description: "Description here",
    },
    other: {
      "fc:miniapp": JSON.stringify(frame),
    },
  };
}
```

**Success Criteria:**

- Meta tag present in HTML head
- Valid JSON in content attribute
- Image URL returns 200 and is 3:2 ratio
- Button title ≤ 32 characters

---

### Check 3: Preview and Runtime

#### 3.1 Test in Preview Tool

**URL Format:**

```
https://farcaster.xyz/~/developers/mini-apps/preview?url={encoded-mini-app-url}
```

**Example:**

```bash
# Encode your URL
encoded_url=$(python3 -c "import urllib.parse; print(urllib.parse.quote('https://example.com/page'))")
echo "https://farcaster.xyz/~/developers/mini-apps/preview?url=$encoded_url"
```

#### 3.2 Verify App Initialization

**Common Issues:**

<details>
  <summary>App not loading (infinite splash screen)</summary>

**Cause:** App hasn't called [`sdk.actions.ready()`](/docs/sdk/actions/ready)

**Solution:** Ensure the app calls ready() after initialization:

```javascript
import { sdk } from "@farcaster/miniapp-sdk";

// After app is ready to display
await sdk.actions.ready();
```

</details>

<details>
  <summary>Tunnel URLs not working (ngrok, localtunnel)</summary>

**Issue:** Browser security blocks unvisited tunnel URLs

**Solution:**

1. Open tunnel URL directly in browser first
2. Then use in preview tool
3. This whitelists the domain for iframe usage

**Important Limitations:**

- SDK actions like `addMiniApp()` will fail with tunnel domains
- Your manifest domain must match your app's hosting domain exactly
- Tunnel domains are excluded from discovery/search
- For testing `addMiniApp()` and other manifest-dependent features, deploy to your production domain
</details>

---

### Post-Check Verification

After making any changes, you should:

1. **Re-verify the manifest is deployed:**

   ```bash
   curl -s https://{domain}/.well-known/farcaster.json | jq .
   ```

2. **Test a shareable link:**

   - Ask the user to share in Farcaster client
   - Verify embed preview appears
   - Confirm app launches on click

3. **Monitor for errors:**
   - Check browser console for SDK errors
   - Verify no CORS issues
   - Ensure all assets load (splash image, icon)

---

### Quick Reference

| Check           | Command                                       | Success Indicator      |
| --------------- | --------------------------------------------- | ---------------------- |
| Manifest exists | `curl -s {domain}/.well-known/farcaster.json` | HTTP 200, valid JSON   |
| Manifest signed | Decode `payload`, check domain                | Domain matches hosting |
| Embed present   | `curl -s {url} \| grep fc:miniapp`            | Meta tag found         |
| Preview works   | Open preview tool URL                         | App loads, no errors   |
| App ready       | Check console logs                            | `ready()` called       |

---

### Related Documentation

- [Getting Started Guide](/docs/getting-started)
- [Publishing Guide](/docs/guides/publishing)
- [SDK Actions Reference](/docs/sdk/actions/ready)

import { Caption } from '../../../components/Caption.tsx';

## Authenticating users

![signing in a user](/sign_in_preview.png)

<Caption>
  A user opens an app and is automatically signed in
</Caption>

Mini Apps can seamlessly authenticate Farcaster users to create secure sessions.

### Quick Auth

The easiest way to get an authenticated session for a user. [Quick
Auth](/docs/sdk/quick-auth) uses [Sign in with
Farcaster](https://docs.farcaster.xyz/developers/siwf/) under the hood to
authenticate the user and returns a standard JWT that can be easily verified by
your server and used as a session token.

[<div style={{ display: 'flex', alignItems: 'center', gap: 8}}>Get started with Quick Auth <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></div>](/docs/sdk/quick-auth)

### Sign In with Farcaster

Alternatively, an app can use the [signIn](/docs/sdk/actions/sign-in) to get a
[Sign in with Farcaster](https://docs.farcaster.xyz/developers/siwf/)
authentication credential for the user.

After requesting the credential, applications must verify it on their server
using
[verifySignInMessage](https://docs.farcaster.xyz/auth-kit/client/app/verify-sign-in-message).
Apps can then issue a session token like a JWT that can be used for the
remainder of the session.

### Enable seamless sign in on web

Farcaster recently added support for signing in via additional wallets (see the
[Auth Address](https://github.com/farcasterxyz/protocol/discussions/225)
standard).

If you are using Quick Auth no action is needed. If you are using `signIn`
directly you will need to make a couple changes to support signing in with Auth
Addresses:

:::steps

#### Accept auth addresses

Update `@farcaster/miniapp-sdk` to version `0.0.39` or later. Opt in to auth
address sign in by passing `acceptAuthAddress: true` to the `signIn` action:

```ts
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.signIn({
  nonce,
  acceptAuthAddress: true,
});
```

:::

Farcaster client developers can find more information [here](https://www.notion.so/warpcast/Public-Auth-Address-Implementation-Guide-1fc6a6c0c10180a9b2a7f24c71143eae).

#### Verifying an auth address sign in

If you use a third party authentication provider like Privy or Dynamic, check
their docs. You’ll likely need to update your dependencies.

If you verify sign in messages yourself, update the `@farcaster/auth-client`
package to version `0.7.0` or later. Calling `verifySignInMessage` will now verify
signatures from a custody or auth address.

import { Caption } from '../../../components/Caption.tsx';

## App Discovery & Search

Making your Mini App discoverable is crucial for reaching users in the Farcaster ecosystem. This guide covers how to ensure your app is correctly indexed and visible in our mini apps catalogue.

### Making Your App Discoverable in Farcaster

Apps appear in the [main directory](https://farcaster.xyz/miniapps) and search engine on [Farcaster](https://farcaster.xyz). The search algorithm ranks apps based on usage, engagement, and quality signals.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/search-results-example.png" alt="Search results showing Mini Apps" style={{ maxWidth: '400px' }} />
</div>

<Caption>
  Mini Apps appear alongside users in Farcaster search results, showing app name, icon, and creator.
</Caption>

For your Mini App to be properly indexed and discoverable, several criteria must be met:

#### App Registration

- **Register your manifest**: Your app must be registered with Farcaster using the [manifest tool](https://farcaster.xyz/~/developers/mini-apps/manifest). Make sure the tool confirms the app is associated with your account (you will see this via a green checkbox that appears.)
- **Hosted manifests**: If you use the Farcaster hosted manifest tool, you will still need to register your manifest

#### Required Fields

Your `farcaster.json` manifest must include these essential fields:

- **`name`**: A clear, descriptive app name
- **`iconUrl`**: A working image URL for your app icon
- **`homeUrl`**: The main URL for your app
- **`description`**: A helpful description of what your app does

**Note:** These fields are not required to have a mini app render as an embed, but they are necessary for the mini app to be indexed in the search engine.

#### Usage & Engagement Criteria

Apps must demonstrate basic usage before being indexed:

- **Minimum usage threshold**: Apps need some user engagement before appearing in search
- **Recent activity**: Apps must have been opened recently to remain in search results
- **Usage scores**: Apps are ranked based on:
  - Number of users who opened the app
  - Number of users who added the app to their collection
  - Trending score based on recent engagement

#### Visual Requirements

- **Working images**: All images (especially `iconUrl`) must be accessible, return an `image/*` header, and return valid image content
- **Image validation**: Images are checked for proper HTTP responses and content-type headers
- **Icon requirement**: Apps without valid icons will not be indexed

#### Domain Requirements

- **Production domains**: Apps must be hosted on production domains, not development tunnels
- **No tunnel domains**: Apps hosted on ngrok, replit.dev, localtunnel, and similar development tunnels are excluded from search

### FAQ

#### Why isn't my app showing up in search?

For your Mini App to appear in search results, it must meet several criteria:

- **App indexing enabled**: Ensure your app doesn't have `noindex: true` set in your manifest
- **Manifest registered**: Your app must be registered with Farcaster using the [manifest tool](https://farcaster.xyz/~/developers/mini-apps/manifest)
- **Recent usage**: Your app needs active users and recent opens to stay in search results
- **Usage thresholds**: Meet minimum engagement requirements for opens, adds, or trending activity
- **Working images**: Your `iconUrl` must be accessible and return valid image content
- **Complete manifest**: Required fields (`name`, `iconUrl`, `homeUrl`, `description`) must be filled out
- **Production domain**: Apps hosted on development tunnels (ngrok, replit.dev, etc.) are excluded from search
- **Manifest refresh**: Your manifest must be refreshed regularly to stay indexed

If your app meets these requirements but still isn't appearing, the indexing system may need time to process your app or update scores.

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

#### How long does it take to reindex my data

We try to refresh all domains in our search engine daily.

#### How does the trending score work?

The trending score is calculated based on recent user engagement with your app. Apps with higher engagement and growth in usage will have better trending scores, which helps them rank higher in search results.

#### Can I improve my app's search ranking?

Yes, you can improve your ranking by:

- Encouraging users to add your app to their collection
- Maintaining regular user engagement
- Ensuring your app provides value that keeps users coming back
- Keeping your manifest up-to-date with accurate information

#### Do I need to resubmit my app after making changes?

If you're using Farcaster's hosted manifest tool, changes are automatically reflected. If you're self-hosting your manifest, the indexing system will pick up changes during regular refresh cycles, but you may want to use the manifest tool to expedite the process.

import { Caption } from '../../../components/Caption.tsx';

## Migrating to a new domain

While Mini Apps are designed to be associated with a stable domain, there are times when you may need to migrate your app to a new domain. This could be due to rebranding, domain expiration, or other business reasons.

The `canonicalDomain` field enables a smooth transition by allowing you to specify the new domain in your old manifest, ensuring clients can discover and redirect to your app's new location.

### How domain migration works

When a Mini App is accessed through its old domain, Farcaster clients check the manifest for a `canonicalDomain` field. If present, clients will:

1. Recognize that the app has moved to a new domain
2. Update their references to point to the new domain
3. Redirect users to the app at its new location

This ensures continuity for your users and preserves your app's presence in app stores and user installations.

### Migration steps

::::steps

#### Prepare your new domain

Set up your Mini App on the new domain with a complete manifest file at `/.well-known/farcaster.json`. This should include all your app configuration and an account association from the same FID to maintain ownership verification.

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "miniapp": {
    "version": "1",
    "name": "Your App Name",
    "iconUrl": "https://new-domain.com/icon.png",
    "homeUrl": "https://new-domain.com"
    // ... other configuration
  }
}
```

#### Update the old domain manifest

Add the `canonicalDomain` field to your manifest on the **old domain**, pointing to your new domain:

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "miniapp": {
    "version": "1",
    "name": "Your App Name",
    "iconUrl": "https://old-domain.com/icon.png",
    "homeUrl": "https://old-domain.com",
    "canonicalDomain": "new-domain.com" // Add this line
    // ... other configuration
  }
}
```

:::note
The `canonicalDomain` value must be a valid domain name without protocol, port, or path:

- ✅ `app.new-domain.com`
- ✅ `new-domain.com`
- ❌ `https://new-domain.com`
- ❌ `new-domain.com:3000`
- ❌ `new-domain.com/app`
  :::

#### Optional: Add canonicalDomain to the new manifest

You can optionally include the `canonicalDomain` field in your new domain's manifest as well, pointing to itself. This can help with client caching and ensures consistency:

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "miniapp": {
    "version": "1",
    "name": "Your App Name",
    "iconUrl": "https://new-domain.com/icon.png",
    "homeUrl": "https://new-domain.com",
    "canonicalDomain": "new-domain.com" // Self-referential
    // ... other configuration
  }
}
```

#### Maintain both domains during transition

Keep both domains active during the migration period to ensure a smooth transition:

- Continue serving your app from the old domain with redirects to the new domain
- Keep the manifest file accessible on both domains
- Monitor traffic to understand when most users have migrated

#### Implement redirects (recommended)

While the `canonicalDomain` field helps Farcaster clients understand the migration, you should also implement HTTP redirects from your old domain to the new one for users accessing your app directly after the manifest changes have been retrieved by the clients:

```js
// Example redirect in Express
app.get("*", (req, res) => {
  const newUrl = `https://new-domain.com${req.originalUrl}`;
  res.redirect(301, newUrl);
});
```

::::

### Best practices

#### Plan ahead

- Choose a stable domain from the start to minimize the need for migrations
- If you anticipate a rebrand, consider using a neutral domain that can outlast brand changes

#### Communicate the change

- Notify your users about the domain change through in-app messages or casts
- Update any documentation or links that reference your old domain

#### Test thoroughly

- Verify that your manifest is correctly served on both domains
- Test the migration flow in different Farcaster clients
- Ensure all app functionality works correctly on the new domain

#### Monitor the transition

- Track traffic on both domains to understand migration progress
- Keep the old domain active until traffic drops to negligible levels
- Consider setting up analytics to track successful redirects

### Troubleshooting

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

#### Clients not recognizing the new domain

Ensure that:

- The `canonicalDomain` value is correctly formatted (no protocol, port, or path)
- Your manifest is accessible at `/.well-known/farcaster.json` on both domains
- The manifest JSON is valid and properly formatted

#### Users still accessing the old domain

This is normal during transition. Some clients may cache manifest data, and users may have bookmarked the old URL. Continue to serve redirects from the old domain.

#### Account association issues

Make sure you use the same account to produce the association on both domains to maintain ownership verification. Do not reuse the account association data from one manifest to the other.

## FAQ: Frequently Asked Questions

### What is the difference between a manifest and an embed?

**Quick Answer**: A **manifest** is your app's identity document (one per domain), while an **embed** is social sharing metadata (one per page you want shareable).

- **Manifest** = App registration at `/.well-known/farcaster.json` that identifies your entire Mini App
- **Embed** = Page-level `fc:miniapp` meta tags that make individual URLs shareable as rich cards

**For a complete explanation with examples and implementation guidance**, see our detailed [Manifest vs Embed Developer Guide](/docs/guides/manifest-vs-embed).

### Do I need both a manifest and embeds?

**For most Mini Apps: Yes.**

Without a manifest, your app can't be added to users' app lists, send notifications, or appear in app discovery. Without embeds, your pages won't be shareable as rich cards in social feeds.

### Are Frames v2 and Mini Apps the same thing?

Yes! Frames v2 and Mini Apps are the same technology. "Mini Apps" is the current name for what was previously called "Frames v2."

### Do I need paid APIs to build a Mini App?

Not necessarily. Many basic operations can be done with free tiers, but some advanced features may require paid services like Neynar for expanded functionality.

### Why isn't my app showing up in search?

Your app needs to meet several requirements:

- **Registered manifest** with complete required fields
- **Recent user activity** and engagement
- **Working images** with proper content-type headers
- **Production domain** (not development tunnels like ngrok)

See our [App Discovery & Search guide](/docs/guides/discovery) for complete requirements.

### Why do I see an infinite loading screen?

Make sure you're calling `sdk.actions.ready()` after your app is fully loaded:

```javascript
import { sdk } from "@farcaster/miniapp-sdk";

// Wait for your app to be ready, then call
await sdk.actions.ready();
```

This is required to hide the splash screen and display your content.

### How do I test my Mini App locally?

Currently, you need to use tunneling tools like ngrok to expose your local server:

1. **Node.js version**: Use Node.js 22.11.0 or higher
2. **Tunneling**: Use ngrok or similar tools to create HTTPS URLs
3. **HTTPS required**: Farcaster requires HTTPS for Mini Apps
4. **Test your app**: Use the [Mini App Preview Tool](https://farcaster.xyz/~/developers/mini-apps/preview) to test the app at your tunneled URL

### My manifest isn't validating. What's wrong?

Common validation issues:

- **Invalid JSON syntax** - Use a JSON validator to check
- **Missing required fields** - Ensure `name`, `iconUrl`, `homeUrl` are present
- **Invalid image URLs** - Images must return proper `image/*` content-type headers
- **Domain mismatch** - The manifest domain must match where it's hosted

### How does app discovery and ranking work?

Apps are ranked using multiple engagement signals:

- **Opens**: How frequently users access your app
- **Additions**: Number of users who add your app to their collection
- **Transaction data**: EVM and SOL transactions within your app
- **Trending signals**: Recent growth and engagement momentum

Apps must meet minimum usage thresholds and maintain recent activity to appear in search results.

### Can I use my own authentication instead of Farcaster auth?

While you can implement custom auth, using Farcaster's built-in authentication provides better integration and user experience within the Farcaster ecosystem.

### How do I get notifications working?

You need:

1. A `webhookUrl` in your manifest
2. Proper webhook endpoint implementation
3. Users must add your app to enable notifications

See our [notifications guide](/docs/guides/notifications) for complete setup instructions.

### What happens if users don't have Farcaster accounts?

Mini Apps are designed to work within the Farcaster ecosystem. Users need Farcaster accounts to fully interact with Mini Apps and their social features.

### How do I handle breaking changes?

- Follow our [changelog](/docs/sdk/changelog) for updates
- Join the [Devs: Mini Apps](https://farcaster.xyz/~/group/X2P7HNc4PHTriCssYHNcmQ) group chat on Faracaster
- Use versioned dependencies to control update timing

## Loading your app

When users open Mini Apps in Farcaster they are shown a branded splash screen
instead of a blank loading page like they would in a browser. Once your interface
is ready to show the splash screen can be hidden.

![calling ready to hide the splash screen](/ready_preview.png)

### Calling ready

Call [ready](/docs/sdk/actions/ready) when your interface is ready to be displayed:

#### In React applications

If you're using React, call `ready` inside a `useEffect` hook to prevent it from running on every re-render:

**You should call ready as soon as possible while avoiding jitter and content
reflows.**

Minimize loading time for your app by following web performance best practices:

- [Learn about web performance](https://web.dev/learn/performance)
- [Test your app's speed and diagnose performance issues](https://pagespeed.web.dev/analysis/https-pagespeed-web-dev/bywca5kqd1?form_factor=mobile)

<br />

To avoid jitter and content reflowing:

- Don't call ready until your interface has loaded
- Use placeholders and skeleton states if additional loading is required

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

#### Disabling native gestures

Mini Apps are rendered in modal elements where certain swipe gestures or clicks
outside the app surface will result in the app closing. If your app has conflicting
gestures you can set the `disableNativeGestures` flag to disable native gestures.

### Splash Screen

When a user launches your app they will see a Splash Screen while your app loads.

![splash screen schematic](/splash_screen_schematic.png)

You'll learn how to configure the Splash Screen in the [sharing your
app](/docs/guides/sharing) and [publishing your app](/docs/guides/publishing)
guides.

### Previewing your app

This app doesn't do anything interesting yet but we've now done the bare
minimum to preview it inside a Farcaster client.

Let's preview it in Warpcast:

1. Open the [Mini App Debug Tool](https://farcaster.xyz/~/developers/mini-apps/debug)
   on desktop
2. Enter your app url
3. Hit _Preview_

:::info
You must be logged into your Warpcast account on desktop to access the Mini App Debug Tool.
:::

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

## Farcaster Mini Apps: Manifests vs Embeds Developer Guide

### Quick Summary

**Manifest** = Your app's identity and configuration (one per domain)\
**Embed** = Social sharing for individual pages (many per domain)

---

### Frequently Asked Questions

#### What's the difference between a manifest and an embed?

**Manifest** is a configuration file that identifies and configures your entire Mini App at the domain level. It lives at `/.well-known/farcaster.json` and tells Farcaster clients "this domain is a Mini App."

**Embed** is page-level metadata that makes individual URLs shareable as rich objects in Farcaster feeds. It lives in HTML meta tags and tells Farcaster clients "this specific page can be rendered as an interactive card."

#### Do I need both?

**For most Mini Apps: Yes.**

- **You need a manifest** to officially register your Mini App with Farcaster clients
- **You need embeds** to make your pages shareable and discoverable in social feeds

#### When do I only need a manifest?

You only need a manifest if:

- Your app is purely accessed through direct navigation (not social sharing)
- You don't want individual pages to appear as rich cards in feeds
- Your app is more like a traditional web app that happens to run in Farcaster

#### When do I only need an embed?

You rarely need only an embed. Without a manifest:

- Your app can't be added to users' app lists
- You can't send notifications
- You can't appear in app stores/discovery
- You miss out on deeper Farcaster integrations

#### What does a manifest control?

A manifest (`/.well-known/farcaster.json`) controls:

- **App identity**: name, icon, description
- **Domain verification**: proves you own the domain
- **App store listings**: how your app appears in discovery
- **Notifications**: webhook URLs for push notifications
- **Default launch behavior**: where users go when they open your app

#### What does an embed control?

An embed (`fc:miniapp` meta tag) controls:

- **Social sharing**: how a specific page looks when shared in feeds
- **Rich cards**: the image, button, and action for that page
- **Discovery**: how users find and interact with that specific content

#### Can I have multiple embeds on one domain?

**Yes!** You should have:

- **One manifest** per domain (at `/.well-known/farcaster.json`)
- **One embed** per page you want to be shareable (in each page's HTML `<head>`)

Example:

```
myapp.com/.well-known/farcaster.json  ← Manifest
myapp.com/game/123                     ← Page with embed
myapp.com/leaderboard                  ← Page with embed
myapp.com/profile/456                  ← Page with embed
```

#### What happens if I have an embed but no manifest?

Your page will work as a shareable card in feeds, but:

- Users can't "add" your app to their app list
- You can't send notifications
- You miss app store discovery opportunities
- Farcaster clients may treat you as a legacy frame instead of a Mini App

#### What happens if I have a manifest but no embeds?

Your app will be properly registered with Farcaster, but:

- Individual pages won't be shareable as rich cards
- You lose social discovery opportunities
- Users have to find your app through direct links or app stores only

#### How do manifests and embeds work together?

They complement each other:

1. **Manifest** establishes your app's identity and capabilities
2. **Embeds** make your content discoverable and shareable
3. **Both** reference similar information (app name, icons, URLs) but serve different purposes

The manifest is your "app registration" while embeds are your "social sharing strategy."

#### Do they need to match?

Key fields should be consistent:

- App name should be similar in both
- Icons/images should represent the same brand
- URLs should point to the same domain

But they can differ:

- Manifest has global app info, embeds have page-specific info
- Manifest includes webhook URLs and verification, embeds focus on presentation
- Embed images can be page-specific while manifest icon is app-wide

#### What's the most common mistake?

**Creating embeds without manifests.** Developers often start with embeds because they want social sharing, but forget the manifest. This limits their app's capabilities and integration with Farcaster.

**Best practice**: Set up your manifest first, then add embeds to pages you want to be shareable.

#### Quick implementation checklist

**For your manifest** (`/.well-known/farcaster.json`):

- [ ] Domain verification signature
- [ ] App name, icon, and home URL
- [ ] Webhook URL (if you want notifications)

**For your embeds** (each shareable page):

- [ ] `fc:miniapp` meta tag in HTML `<head>`
- [ ] Version, image URL, and button configuration
- [ ] Action that launches your app

#### Where can I see examples?

Check the [Farcaster specification](/docs/specification) for complete examples of both manifests and embeds with all required fields and formatting.

---

### Summary

Think of it this way:

- **Manifest** = Your app's passport (who you are)
- **Embed** = Your content's business card (what this page does)

You need both to create a complete, discoverable, and engaging Mini App experience on Farcaster.

import { Caption } from '../../../components/Caption.tsx';

## Sending Notifications

:::tip
Reference:
[Notifications Spec](/docs/specification#notifications)
:::

Mini Apps can send notifications to users who have added the Mini App to
their Farcaster client and enabled notifications.

![in-app notifications in Warpcast](/in-app-notifications-preview.png)

<Caption>
  An in-app notification is sent to a user and launches them into the app
</Caption>

### Overview

At a high-level notifications work like so:

- when a user enables notifications for your app, their Farcaster client (i.e. Warpcast)
  will generate a unique notification token and send it to your server
- to send a notification to a user, make a request to the Farcaster client's servers with the
  notification token and content
- if a user later disables notifications, you'll receive another event indicating
  the user is unsubscribed and the notification token is no longer valid

### Terms

To make our life easier, let's call:

- **Farcaster Client**: An application like Warpcast that is able to display Mini Apps.
- **Notification Server**: Your server (see bellow).
- **(Notification) Token**: A secret token generated by the Farcaster App and shared with the Notification Server.
  A token is unique for each (Farcaster Client, Mini App, user Fid) tupple.

A notification token is basically a permission that a Farcaster client gives your app (on behalf of a user)
to send them notifications.

### Steps

::::steps

#### Listen for events

You'll need a notification server to receive webhook events and a database to store
notification tokens for users:

- **Managed** - If you'd rather stay focused on your app, use
  [Neynar](https://neynar.com) to manage notification tokens on your behalf. Includes ways to target notifications and send without writing code: <br />
  [Setup a managed notifications server with
  Neynar](https://docs.neynar.com/docs/send-notifications-to-mini-app-users).
- **Roll your own** - If you want to host your own server to receive webhooks:<br />
  [Follow the Receiving Webhooks guide](#receiving-webhooks).

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

#### Add your webhook URL in `farcaster.json`

If you haven't already, follow the [Publishing your app](/docs/guides/publishing) guide to host a
`farcaster.json` on your app's domain.

Define the `webhookUrl` property in your app's configuration in `farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjU0NDgsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg2MWQwMEFENzYwNjhGOEQ0NzQwYzM1OEM4QzAzYUFFYjUxMGI1OTBEIn0",
    "payload": "eyJkb21haW4iOiJleGFtcGxlLmNvbSJ9",
    "signature": "MHg3NmRkOWVlMjE4OGEyMjliNzExZjUzOTkxYTc1NmEzMGZjNTA3NmE5OTU5OWJmOWFmYjYyMzAyZWQxMWQ2MWFmNTExYzlhYWVjNjQ3OWMzODcyMTI5MzA2YmJhYjdhMTE0MmRhMjA4MmNjNTM5MTJiY2MyMDRhMWFjZTY2NjE5OTFj"
  },
  "miniapp": {
    "version": "1",
    "name": "Example App",
    "iconUrl": "https://example.com/icon.png",
    "homeUrl": "https://example.com",
    "imageUrl": "https://example.com/image.png",
    "buttonTitle": "Check this out",
    "splashImageUrl": "https://example.com/splash.png",
    "splashBackgroundColor": "#eeccff",
    "webhookUrl": "https://example.com/api/webhook" // [!code focus]
  }
}
```

:::note
For a real example, this is Yoink's manifest:
[https://yoink.party/.well-known/farcaster.json](https://yoink.party/.well-known/farcaster.json)
:::

#### Get users to add your app

For a Mini App to send notifications, it needs to first be added by a user to
their Farcaster client and for notifications to be enabled (these will be
enabled by default).

Use the [addMiniApp](/docs/sdk/actions/add-miniapp) action while a user is using your app to prompt
them to add it:

#### Caution

The `addMiniApp()` action only works when your app is deployed to its production domain (matching your manifest). It will not work with tunnel domains during development.

#### Save the notification tokens

When notifications are enabled, the Farcaster client generates a unique
notification token for the user. This token is sent to `webhookUrl` defined in your `farcaster.json`
along with a `url` that the app should call to send a notification.

The `token` and `url` need to be securely saved to database so they can be
looked up when you want to send a notification to a particular user.

#### Send a notification

![notifications schematic](/notification_schematic.png)

Once you have a notification token for a user, you can send them a notification
by sending a `POST` request the `url` associated with that token.

:::tip
If your are sending the same notification to multiple users, you batch up to a
100 sends in a single request by providing multiple `tokens`. You can safely
use the same `notificationId` for all batches.
:::

The body of that request must match the following JSON schema:

import SendNotificationRequestSchema from '../../../snippets/sendNotificationRequestSchema.mdx'

<SendNotificationRequestSchema />

The server should response with an HTTP 200 OK and the following JSON body:

import SendNotificationResponseSchema from '../../../snippets/sendNotificationResponseSchema.mdx'

<SendNotificationResponseSchema />

<br />

When a user clicks the notification, the Farcaster client will:

- Open your Mini App at `targetUrl`
- Set the `context.location` to a `MiniAppLocationNotificationContext`

```ts
export type MiniAppLocationNotificationContext = {
  type: "notification";
  notification: {
    notificationId: string;
    title: string;
    body: string;
  };
};
```

[Example code to send a
notification](https://github.com/farcasterxyz/frames-v2-demo/blob/7905a24b7cd254a77a7e1a541288379b444bc23e/src/app/api/send-notification/route.ts#L25-L65)

##### Avoid duplicate notifications

To avoid duplicate notifications, specify a stable `notificationId` for each
notification you send. This identifier is joined with the FID (e.g. `(fid,
notificationId)` to create a unique key that is used to deduplicate requests
to send a notification over a 24 hour period.

For example, if you want to send a daily notification to users you could use
`daily-reminder-05-06-2024` as your `notificationId`. Now you can safely retry
requests to send the daily reminder notifications within a 24 hour period.

##### Rate Limits

Host servers may impose rate limits per `token`. The standard rate limits,
which are enforced by Warpcast, are:

- 1 notification per 30 seconds per `token`
- 100 notifications per day per `token`
  ::::

### Receiving webhooks

Users can add and configure notification settings Mini Apps within their
Farcaster client. When this happens Farcaster clients will send events your
server that include data relevant to the event.

This allows your app to:

- keep track of what users have added or removed your app
- securely receive tokens that can be used to send notifications to your users

:::note
If you'd rather stay focused on your app, [Neynar](https://neynar.com) offers a
[managed service to handle
webhooks](https://docs.neynar.com/docs/send-notifications-to-frame-users#step-1-add-events-webhook-url-to-frame-manifest)
on behalf of your application.
:::

#### Events

##### miniapp_added

Sent when the user adds the Mini App to their Farcaster client (whether or not
this was triggered by an `addMiniApp()` prompt).

The optional `notificationDetails` object provides the `token` and `url` if the
client equates adding to enabling notifications (Warpcast does this).

##### Payload

```json
{
  "event": "miniapp_added",
  "notificationDetails": {
    "url": "https://api.farcaster.xyz/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

##### miniapp_removed

Sent when a user removes a mini app, which means that any notification tokens for
that fid and client app (based on signer requester) should be considered
invalid:

##### Payload

```json
{
  "event": "miniapp_removed"
}
```

##### notifications_disabled

Sent when a user disables notifications from e.g. a settings panel in the
client app. Any notification tokens for that fid and client app (based on
signer requester) should be considered invalid:

##### Payload

```json
{
  "event": "notifications_disabled"
}
```

##### notifications_enabled

Sent when a user enables notifications (e.g. after disabling them). The payload
includes a new `token` and `url`:

##### Payload

```json
{
  "event": "notifications_enabled",
  "notificationDetails": {
    "url": "https://api.farcaster.xyz/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

#### Handling events

Farcaster clients will POST events to the `webhookUrl` specified in your `farcaster.json`.

Your endpoint should:

- verify the event
- persist relevant data
- return a 200 response

If your app doesn't respond with a 200, the Farcaster client will attempt to
re-send the event. The exact number of retries is up to each client.

#### Verifying events

Events are signed by the app key of a user with a [JSON Farcaster
Signature](https://github.com/farcasterxyz/protocol/discussions/208). This allows
Mini Apps to verify the Farcaster client that generated the notification and the
Farcaster user they generated it for.

The
[`@farcaster/miniapp-node`](https://github.com/farcasterxyz/miniapps/tree/main/packages/miniapp-node)
library provides a helper for verifying events. To use it, you'll need to supply a validation
function that can check the signatures against the latest Farcaster network state.

An implementation that uses [Neynar](https://neynar.com) is provided. You can sign up and get
an API key on their free tier. Make sure to set `NEYNAR_API_KEY` environment variable.

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

#### Example

```ts twoslash
const requestJson = "base64encodeddata";

// ---cut---
import {
  ParseWebhookEvent,
  parseWebhookEvent,
  verifyAppKeyWithNeynar,
} from "@farcaster/miniapp-node";

try {
  const data = await parseWebhookEvent(requestJson, verifyAppKeyWithNeynar);
} catch (e: unknown) {
  const error = e as ParseWebhookEvent.ErrorType;

  switch (error.name) {
    case "VerifyJsonFarcasterSignature.InvalidDataError":
    case "VerifyJsonFarcasterSignature.InvalidEventDataError":
    // The request data is invalid
    case "VerifyJsonFarcasterSignature.InvalidAppKeyError":
    // The app key is invalid
    case "VerifyJsonFarcasterSignature.VerifyAppKeyError":
    // Internal error verifying the app key (caller may want to try again)
  }
}
```

#### Reference implementation

For a complete example, check out the [Mini App V2 Demo
](https://github.com/farcasterxyz/frames-v2-demo) has all of the above:

- [Handles webhooks](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/app/api/webhook/route.ts) leveraging the [`@farcaster/miniapp-node`](https://github.com/farcasterxyz/frames/tree/main/packages/miniapp-node) library that makes this very easy
- [Saves notification tokens to Redis](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/lib/kv.ts)
- [Sends notifications](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/lib/notifs.ts)

import { Caption } from '../../../components/Caption.tsx';

## Publishing your app

Publishing Mini Apps involves providing information like who developed the app,
how it should be displayed, and what its capabilities are.

Since Farcaster is a decentralized network with multiple clients, publishing is
done by hosting a manifest file at `/.well-known/farcaster.json` on the domain
your app is hosted on rather than submitting information directly to a single
entity.

![discover mini apps](/explore-preview.png)

<Caption>
  Published Mini Apps can be discovered in App Stores.
</Caption>

### Steps

::::steps

#### Choose a domain

A Mini App is associated with a single domain (i.e. rewards.warpcast.com). This
domain serves as the identifier for your app and can't be changed later so
you should choose a stable domain.

There's no limit on the number of apps you can create. You can create a separate
domain specifically for development purposes if needed.

:::note
A domain does not include the scheme (e.g. https) or path. It can optionally
include a subdomain.

- ✅ rewards.warpcast.com
- ❌ [https://rewards.warpcast.com](https://rewards.warpcast.com)
  :::

#### Host a manifest file

Host a manifest file on your chosen domain at `/.well-known/farcaster.json`.

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

For now we'll create an empty file:

```sh
touch public/.well-known/farcaster.json
```

##### Farcaster Hosted Manifests (Now Public!)

Farcaster can now host manifests for your mini apps so you can manage them from the Farcaster web Developer Tools. This is now available to everyone!

**Benefits of hosted manifests:**

- No need to manage manifest files in your codebase
- Update manifest details without redeploying
- Automatic validation and error checking
- Easy domain migration support

To create a hosted manifest, visit: [https://farcaster.xyz/\~/developers/mini-apps/manifest](https://farcaster.xyz/~/developers/mini-apps/manifest)

<details>
  <summary>Setting up hosted manifests</summary>

Instead of serving a `/.well-known/farcaster.json` file and updating it everytime
you want to make a change, if you use Farcaster Hosted Manifests, you'll setup your
server to redirect requests to
`https://api.farcaster.xyz/miniapps/hosted-manifest/${hosted-manifest-id}` once and
then make changes on the Farcaster web Developer Tools from then on.

  <br />

To get your hosted manifest ID:

1. Go to [https://farcaster.xyz/\~/developers/mini-apps/manifest](https://farcaster.xyz/~/developers/mini-apps/manifest)
2. Enter your domain and app details
3. You'll receive a hosted manifest ID
4. Set up the redirect as shown below

##### Setting up redirects

All web servers support redirects. The following are examples of how to setup redirects in popular frameworks.

  <details>
    <summary>Redirects in Next.js</summary>

    ```ts
    // next.config.js
    import type { NextConfig } from 'next'

    const nextConfig: NextConfig = {
      async redirects() {
        return [
          {
            source: '/.well-known/farcaster.json',
            destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/1234567890',
            permanent: false,
          },
        ]
      },
    }

    export default nextConfig
    ```

  </details>

  <details>
    <summary>Redirects in Express</summary>

    ```ts
    const express = require('express')
    const app = express()

    app.get('/.well-known/farcaster.json', (req, res) => {
      res.redirect(307, 'https://api.farcaster.xyz/miniapps/hosted-manifest/1234567890')
    })
    ```

  </details>

  <details>
    <summary>Redirects in Hono</summary>

    ```ts
    import { Hono } from 'hono'
    const app = new Hono()

    app.get('/.well-known/farcaster.json', (c) => {
      return c.redirect('https://api.farcaster.xyz/miniapps/hosted-manifest/1234567890', 307)
    })

    ```

  </details>

  <details>
    <summary>Redirects in Remix</summary>

    ```ts
    // app/routes/.well-known/farcaster.json.tsx
    import { redirect } from '@remix-run/node'

    export const loader = () => {
      return redirect('https://api.farcaster.xyz/miniapps/hosted-manifest/1234567890', 307)
    }

    export default () => null
    ```

  </details>
</details>

#### Define your application configuration

A Mini App has metadata that is used by Farcaster clients to host your app. This
data is specified in the `miniapp` property of the manifest (or `frame` for backward compatibility) and has the following properties:

import ManifestAppConfigSchema from "../../../snippets/manifestAppConfigSchema.mdx"

<ManifestAppConfigSchema />

Here's an example `farcaster.json` file:

```json
{
  "miniapp": {
    "version": "1",
    "name": "Yoink!",
    "iconUrl": "https://yoink.party/logo.png",
    "homeUrl": "https://yoink.party/framesV2/",
    "imageUrl": "https://yoink.party/framesV2/opengraph-image",
    "buttonTitle": "🚩 Start",
    "splashImageUrl": "https://yoink.party/logo.png",
    "splashBackgroundColor": "#f5f0ec",
    "requiredChains": ["eip155:8453"],
    "requiredCapabilities": [
      "actions.signIn",
      "wallet.getEthereumProvider",
      "actions.swapToken"
    ]
  }
}
```

:::note
You can omit `webhookUrl` for now. We'll show you how to set it up in the
[sending notifications guide](/docs/guides/notifications).
:::

#### Hybrid & SSR-friendly detection <span id="hybrid-detection" />

Some apps serve **both** as a Farcaster Mini App and a website from the same
domain. When you want to fetch specific resources **during server-side rendering (SSR)** or
conditionally lazy-load the SDK on the client, add a lightweight flag that only
Mini-App launch URLs include

**Two suggested patterns**

| Pattern                    | How it looks                            | Why use it                                 |
| -------------------------- | --------------------------------------- | ------------------------------------------ |
| **Dedicated path**         | `/your/path/.../miniapp`                | Easiest to match on the server             |
| **Well-known query param** | `https://example.com/page?miniApp=true` | Works when a single page serves both modes |

:::note
Treat these markers as a **best-effort hint, not proof**.\
Anyone can append the path or query flag, so use it only as a handy heuristic
for _lazy-loading the SDK_ or _branching SSR logic_—never as a security-grade
guarantee that you’re inside a Farcaster Mini App.
:::

##### Example

```ts
// app/layout.tsx
"use client";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const isMini =
      url.pathname.startsWith("/mini") ||
      url.searchParams.get("miniApp") === "true";

    if (isMini) {
      import("@farcaster/miniapp-sdk").then(({ sdk }) => {
        // Mini-App–specific bootstrap here
        // e.g. sdk.actions.ready()
      });
    }
  }, []);

  return children;
}
```

On the server you can do the same check to skip expensive Mini App work during
SSR.

### Verifying ownership

A Mini App is owned by a single Farcaster account. This lets users know who
they are interacting with and developers get credit for their work.

:::tip
Verified Mini Apps are automatically eligible for [Warpcast Developer
Rewards](https://farcaster.xyz/~/mini-apps/rewards) that are paid out weekly
based on usage and onchain transactions.
:::

![verified author ](/verified_author.png)

Verification is done by placing a cryptographically signed message in the
`accountAssociation` property of your `farcaster.json`.

You can generate a signed account association object using the [Mini App
Manifest Tool](https://farcaster.xyz/~/developers/new) in Warpcast. Take
the output from that tool and update your `farcaster.json` file.

:::warning
The domain you host the file on must exactly match the domain you entered in
the Warpcast tool.
:::

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

Here's an example `farcaster.json` file for the domain `yoink.party` with the
account association:

```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
    "payload": "eyJkb21haW4iOiJyZXdhcmRzLndhcnBjYXN0LmNvbSJ9",
    "signature": "MHgxMGQwZGU4ZGYwZDUwZTdmMGIxN2YxMTU2NDI1MjRmZTY0MTUyZGU4ZGU1MWU0MThiYjU4ZjVmZmQxYjRjNDBiNGVlZTRhNDcwNmVmNjhlMzQ0ZGQ5MDBkYmQyMmNlMmVlZGY5ZGQ0N2JlNWRmNzMwYzUxNjE4OWVjZDJjY2Y0MDFj"
  },
  "miniapp": {
    "version": "1",
    "name": "Rewards",
    "iconUrl": "https://rewards.warpcast.com/app.png",
    "splashImageUrl": "https://rewards.warpcast.com/logo.png",
    "splashBackgroundColor": "#000000",
    "homeUrl": "https://rewards.warpcast.com",
    "webhookUrl": "https://client.farcaster.xyz/v1/creator-rewards-notifs-webhook",
    "subtitle": "Top Warpcast creators",
    "description": "Climb the leaderboard and earn rewards by being active on Warpcast.",
    "screenshotUrls": [
      "https://rewards.warpcast.com/screenshot1.png",
      "https://rewards.warpcast.com/screenshot2.png",
      "https://rewards.warpcast.com/screenshot3.png"
    ],
    "primaryCategory": "social",
    "tags": ["rewards", "leaderboard", "warpcast", "earn"],
    "heroImageUrl": "https://rewards.warpcast.com/og.png",
    "tagline": "Top Warpcast creators",
    "ogTitle": "Rewards",
    "ogDescription": "Climb the leaderboard and earn rewards by being active on Warpcast.",
    "ogImageUrl": "https://rewards.warpcast.com/og.png"
  }
}
```

::::

import { Caption } from '../../../components/Caption';

## Share Extensions

Share extensions allow your Mini App to appear in the Farcaster share sheet, enabling users to share casts directly to your app. When a user shares a cast to your Mini App, it opens with the cast context, allowing you to provide rich, cast-specific experiences.

![Mini app share extension](/share_extension_preview.png)

<Caption>
  Mini Apps can receive shared casts through the system share sheet
</Caption>

### How it works

When a user views a cast in any Farcaster client, they can tap the share button and select your Mini App from the share sheet. Your app will open with information about the shared cast, including the cast hash, author FID, and the viewer's FID.

The entire flow takes just two taps:

1. User taps share on a cast
2. User selects your Mini App from the share sheet

Your Mini App then opens with full context about the shared cast, ready to provide a tailored experience.

### Setting up share extensions

To enable your Mini App to receive shared casts, add a `castShareUrl` to your manifest:

```json
{
  "appUrl": "https://your-app.com",
  "icon": "https://your-app.com/icon.png",
  "castShareUrl": "https://your-app.com/share"
}
```

The `castShareUrl` must:

- Use HTTPS
- Match the domain of your registered Mini App
- Be an absolute URL

After updating your manifest, refresh your manifest and the share extension will be available to all users who have added your Mini App.

### Receiving shared casts

When your Mini App is opened via a share extension, it receives the cast information in two ways:

#### 1. URL Parameters (Available immediately)

Your `castShareUrl` receives these query parameters:

| Parameter   | Type   | Description                                         |
| ----------- | ------ | --------------------------------------------------- |
| `castHash`  | string | The hex-encoded hash of the shared cast             |
| `castFid`   | number | The FID of the cast author                          |
| `viewerFid` | number | The FID of the user sharing the cast (if logged in) |

Example URL:

```
https://your-app.com/share?castHash=0x5415e243853e...&castFid=2417&viewerFid=12152
```

These parameters are available immediately, even during server-side rendering, allowing you to begin fetching cast data right away.

#### 2. SDK Context (Available after initialization)

Once your Mini App initializes, the SDK provides enriched cast data through the location context:

```typescript
import sdk from "@farcaster/miniapp-sdk";

if (sdk.context.location.type === "cast_share") {
  const cast = sdk.context.location.cast;

  // Access enriched cast data
  console.log(cast.author.username);
  console.log(cast.hash);
  console.log(cast.timestamp);

  // Access optional fields if available
  if (cast.channelKey) {
    console.log(`Shared from /${cast.channelKey}`);
  }
}
```

The cast object includes:

```typescript
type MiniAppCast = {
  author: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
  hash: string;
  parentHash?: string;
  parentFid?: number;
  timestamp?: number;
  mentions?: MiniAppUser[];
  text: string;
  embeds?: string[];
  channelKey?: string;
};
```

### Implementation example

Here's a complete example showing how to handle shared casts in your Mini App:

```typescript
import { useEffect, useState } from "react";
import sdk from "@farcaster/miniapp-sdk";

function App() {
  const [sharedCast, setSharedCast] = useState(null);
  const [isShareContext, setIsShareContext] = useState(false);

  useEffect(() => {
    // Check if we're in a share context
    if (sdk.context.location.type === "cast_share") {
      setIsShareContext(true);
      setSharedCast(sdk.context.location.cast);
    }
  }, []);

  if (isShareContext && sharedCast) {
    return (
      <div>
        <h1>Cast from @{sharedCast.author.username}</h1>
        <p>Analyzing cast {sharedCast.hash}...</p>
        {/* Your cast-specific UI here */}
      </div>
    );
  }

  // Default app experience
  return <div>Your regular app UI</div>;
}
```

### Real-world example: Degen Stats

[Degen Stats](https://farcaster.xyz/miniapps/jrth1IniizBC/degen) demonstrates the power of share extensions. Originally designed to show viewers their own stats, it was quickly upgraded to support share extensions. Now when users share a cast to Degen Stats, it seamlessly displays stats for the cast's author instead of the viewer - a simple but powerful enhancement that took minimal implementation effort.

### Best practices

1. **Handle both contexts**: Design your app to work both as a standalone Mini App and when receiving shared casts.

2. **Fast loading**: Users expect immediate feedback when sharing. Show a loading state while fetching additional cast data.

3. **Graceful fallbacks**: Not all cast fields are guaranteed. Handle missing data gracefully.

4. **Clear value**: Make it obvious why sharing a cast to your app provides value. Users should understand what your app does with the shared cast.

5. **Server-side rendering**: Take advantage of URL parameters for faster initial loads by starting data fetches on the server.

### Testing share extensions

During development, you can test share extensions by:

1. Adding your development URL to your manifest
2. Refreshing your manifest
3. Sharing any cast to your Mini App from a Farcaster client
4. Verifying your app receives the correct parameters and context

### Next steps

- Learn about [SDK Context](/docs/sdk/context) to understand all available location types
- Explore [Compose Cast](/docs/sdk/actions/compose-cast) to let users create casts from your Mini App
- Check out [View Cast](/docs/sdk/actions/view-cast) to navigate users to specific casts

import { Caption } from '../../../components/Caption.tsx';

## Sharing your app

Mini Apps can be shared in social feeds using special embeds that let users
interact with an app directly from their feed.

Each URL in your application can be made embeddable by adding meta tags to it
that specify an image and action, similar to how Open Graph tags work.

For example:

- a personality quiz app can let users share a personalized embed with their results
- an NFT marketplace can let users share an embed for each listing
- a prediction market app can let users share an embed for each market

![sharing an app in a social feed with a embed](/share_preview.png)

<Caption>
  A viral loop: user discovers app in feed → uses app → shares app in feed
</Caption>

### Sharing a page in your app

Add a meta tag in the `<head>` section of the page you want to make
sharable specifying the embed metadata:

```html
<meta name="fc:miniapp" content="<stringified MiniAppEmbed JSON>" />
<!-- For backward compatibility -->
<meta name="fc:frame" content="<stringified MiniAppEmbed JSON>" />
```

When a user shares the URL with your embed on it in a Farcaster client, the
Farcaster client will fetch the HTML, see the `fc:miniapp` (or `fc:frame` for backward compatibility) meta tag, and use it
to render a rich card.

### Properties

![mini app embed](/embed_schematic.png)

#### `version`

The string literal `'1'`.

#### `imageUrl`

The URL of the image that should be displayed.

##### Image Format Requirements

**Supported formats:** PNG, JPG, GIF, WebP\
**Recommended:** PNG for best compatibility

:::warning
**Production Warning**: While SVG may work in preview tools, use PNG for production to ensure compatibility across all Farcaster clients.
:::

**Size requirements:**

- Aspect ratio: 3:2
- Minimum dimensions: 600x400px
- Maximum dimensions: 3000x2000px
- File size: Must be less than 10MB
- URL length: Must be ≤ 1024 characters

#### `button.title`

This text will be rendered in the button. Use a clear call-to-action that hints
to the user what action they can take in your app.

#### `button.action.type`

The string literal `'launch_miniapp'` (or `'launch_frame'` for backward compatibility).

#### `button.action.url` (optional)

The URL that the user will be sent to within your app. If not provided, it defaults to the current webpage URL (including query parameters).

#### `button.action.name` (optional)

Name of the application. Defaults to name of your application in `farcaster.json`.

#### `button.action.splashImageUrl` (optional)

Splash image URL. Defaults to `splashImageUrl` specified in your application's `farcaster.json`.

#### `button.action.splashBackgroundColor` (optional)

Splash image Color. Defaults to `splashBackgroundColor` specified in your application's `farcaster.json`.

### Example

```typescript
const miniapp = {
  version: "1",
  imageUrl: "https://yoink.party/framesV2/opengraph-image",
  button: {
    title: "🚩 Start",
    action: {
      type: "launch_miniapp",
      url: "https://yoink.party/framesV2",
      name: "Yoink!",
      splashImageUrl: "https://yoink.party/logo.png",
      splashBackgroundColor: "#f5f0ec",
    },
  },
};
```

```html
<html lang="en">
  <head>
    <!-- head content -->
    <meta
      name="fc:miniapp"
      content='{"version":"1","imageUrl":"https://yoink.party/framesV2/opengraph-image","button":{"title":"🚩 Start","action":{"type":"launch_miniapp","name":"Yoink!","url":"https://yoink.party/framesV2","splashImageUrl":"https://yoink.party/logo.png","splashBackgroundColor":"#f5f0ec"}}}'
    />
    <!-- For backward compatibility -->
    <meta
      name="fc:frame"
      content='{"version":"1","imageUrl":"https://yoink.party/framesV2/opengraph-image","button":{"title":"🚩 Start","action":{"type":"launch_frame","name":"Yoink!","url":"https://yoink.party/framesV2","splashImageUrl":"https://yoink.party/logo.png","splashBackgroundColor":"#f5f0ec"}}}'
    />
  </head>
  <body>
    <!-- page content -->
  </body>
</html>
```

### Generating dynamic images

You can use the [miniapp-img](https://github.com/farcasterxyz/miniapp-img) to
easily generate dynamic images for your Mini App. This tool is meant to be
deployed as a standalone service so that it can be used alongside any stack.

### Universal Links

Mini Apps have a canonical URL that can be used to share across social feeds
and web sites. The URL format is as follows:

`https://farcaster.xyz/miniapps/<app-id>/<app-slug>(/<sub-path>)(?<query-params>)`

Learn how to find the Universal Link for your apps and how they work in the
[Universal Links](/docs/guides/urls) guide.

### Debugging

You can use the [Mini App Embed
Tool](https://farcaster.xyz/~/developers/mini-apps/embed) in Warpcast to preview
a embed.

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

import ExposeLocalhost from '../../../snippets/exposeLocalhost.mdx';

<ExposeLocalhost />

### Caching

Since embeds are shared in feeds, they are generally scraped once and cached so
that they can be efficiently served in the feeds of hundreds or thousands
users.

This means that when a URL gets shared, the embed data present at that time
will be attached to the cast and won't be updated even if the embed data at
that URL gets changed.

#### Lifecycle

1. App adds an `fc:miniapp` (and optionally `fc:frame` for backward compatibility) meta tag to a page to make it sharable.
2. User copies URL and embeds it in a cast.
3. Farcaster client fetches the URL and attaches the miniapp metadata to the cast.
4. Farcaster client injects the cast + embed + attached metadata into thousands of feeds.
5. User sees cast in feed with an embed rendered from the attached metadata.

### Receiving shared casts

In addition to sharing your Mini App through embeds, your app can also receive casts that users share to it through the system share sheet. Learn more in the [Share Extensions](/docs/guides/share-extension) guide.

### Next steps

Now that you know how to create embeds for your app, think about how you'll get
users to share them in feed. For instance, you can create a call-to-action once
a user takes an action in your app to share a embed in a cast.

At the very least you'll want to setup a embed for the root URL of your application.

### Advanced Topics

#### Dynamic Embed images

Even though the data attached to a specific cast is static, a dynamic
image can be served using tools like Next.js
[Next ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response).

For example, we could create an embed that shows the current price of ETH. We'd
set the `imageUrl` to a static URL like `https://example.xyz/eth-price.png`. When a request
is made to this endpoint we'd:

- fetch the latest price of ETH (ideally from a cache)
- renders an image using a tool like [Vercel
  OG](https://vercel.com/docs/functions/og-image-generation) and returns it
- sets the following header: `Cache-Control: public, immutable, no-transform,
max-age=300`

##### Setting `max-age`

You should always set a non-zero `max-age` (outside of testing) so that the
image can get cached and served from CDNs, otherwise users will see a gray
image in their feed while the dynamic image is generated. You'll also quickly
rack up a huge bill from your service provider. The exact time depends on your
application but opt for the longest time that still keeps the image reasonably
fresh. If you're needing freshness less than a minute you should reconsider
your design or be prepared to operate a high-performance endpoint.

Here's some more reading if you're interested in doing this:

- [Vercel Blog - Fast, dynamic social card images at the Edge](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images)
- [Vercel Docs - OG Image Generation](https://vercel.com/docs/og-image-generation)

##### Avoid caching fallback images

If you are generating a dynamic images there's a chance something goes wrong when
generating the image (for instance, the price of ETH is not available) and you need
to serve a fallback image.

In this case you should use an extremely short or even 0 `max-age` to prevent the
error image from getting stuck in any upstream CDNs.

## Interacting with Solana wallets

Mini Apps can interact with a user's Solana wallet without needing to worry
about popping open "select your wallet" dialogs or flakey connections.

### Getting Started

The SDK enables Mini Apps to interact with a user's Solana wallet through [Wallet Standard](https://github.com/anza-xyz/wallet-standard/).

We recommend using [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter/)'s React hooks to interface with Wallet Standard. You may also use [Wallet Standard directly](#using-wallet-standard-directly), or interface with our [low-level Solana provider](#low-level-solana-provider).

::::steps

#### Setup Wallet Adapter

Use the [Quick Setup (using React) guide](https://github.com/anza-xyz/wallet-adapter/blob/master/APP.md) to setup Wallet Adapter in your project.

#### Install the Wallet Standard integration

:::code-group

```bash [npm]
npm install @farcaster/mini-app-solana
```

```bash [pnpm]
pnpm add @farcaster/mini-app-solana
```

```bash [yarn]
yarn add @farcaster/mini-app-solana
```

:::

#### Render the Farcaster Solana provider

In place of `ConnectionProvider` and `WalletProvider` from the Wallet Adapter guide, you should render `FarcasterSolanaProvider` from `@farcaster/mini-app-solana`.

This does two things:

1. Importing from `@farcaster/mini-app-solana` has the side effect of triggering the Farcaster wallet to register via Wallet Standard.
2. Sets up Wallet Adapter to automatically select the Farcaster wallet.

```tsx
import * as React from "react";
import { FarcasterSolanaProvider } from "@farcaster/mini-app-solana";
import { useWallet } from "@solana/wallet-adapter-react";

const solanaEndpoint = "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY";

function App() {
  // FarcasterSolanaProvider internally renders ConnectionProvider
  // and WalletProvider from @solana/wallet-adapter-react
  return (
    <FarcasterSolanaProvider endpoint={solanaEndpoint}>
      <Content />
    </FarcasterSolanaProvider>
  );
}
```

#### Use the Wallet Adapter hooks

You can now use Wallet Adapter React hooks directly within any component rendered downstream of `FarcasterSolanaProvider`.

```tsx
function Content() {
  const { publicKey } = useWallet();
  const solanaAddress = publicKey?.toBase58() ?? "";
  return <span>{solanaAddress}</span>;
}
```

::::

### Low-level Solana provider

The SDK also exposes a low-level Solana provider at `sdk.wallet.getSolanaProvider()`.
This provider is modeled after `window.phantom.solana` and its full API can be found [here](https://github.com/farcasterxyz/miniapps/blob/main/packages/miniapp-core/src/solana.ts).

### Using Wallet Standard directly

It's also possible to interface with the user's Solana wallet directly through Wallet Standard, or via Wallet Adapter's "core" (non-React) integrations.

In order to do so, it's important that you still import our package in your app entry:

```tsx
import "@farcaster/mini-app-solana";
```

This ensures that the user's Solana wallet registers with Wallet Standard.

Also note that if you're using Wallet Adapter without our `FarcasterSolanaProvider` React component, you'll need to select the user's Farcaster wallet before attempting any operations.

### Demo app

To see how a working Mini App uses a Solana wallet, check out our demo Mini App [here](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/components/Demo.tsx).

### Troubleshooting

#### Transaction Scanning

Modern crypto wallets scan transactions and preview them to users to help
protect users from scams. New contracts and applications can generate false
positives in these systems. If your transaction is being reported as
potentially malicious use this [Blockaid
Tool](https://report.blockaid.io/verifiedProject) to verify your app with
Blockaid.

import { Caption } from '../../../components/Caption.tsx';

## Universal Links

Mini Apps have a canonical URL that can be used to share across social feeds
and web sites. The URL format is as follows:

`https://farcaster.xyz/miniapps/<app-id>/<app-slug>(/<sub-path>)(?<query-params>)`

- The `<app-id>` is a unique identifier assigned to the Mini App when it is [published](/docs/guides/publishing).
- The `<app-slug>` is a kebab-case version of the Mini App name, used to create a more readable URL.
- The `<sub-path>` is an optional path appended to the Mini App’s `homeURL` when it is opened.
- The `<query-params>` are optional parameters added to the `homeURL` as a query string when the Mini App is opened.

The `<sub-path>` and `<query-params>` are optional and can be used to navigate to a specific page in the Mini App or pass data to the Mini App.

When a user clicks a Universal Link and is logged in:

- **On web**: the Mini App opens in the mini app drawer.
- **On mobile**: the browser deep links to the Farcaster app and opens the Mini App.

### Where to find the Universal Link

On the web [Developers page](https://farcaster.xyz/~/developers), click the top-right
kebab menu on one of your Mini App cards and select **"Copy link to mini app"**. This
copies the Universal Link to your clipboard.

When the Mini App is open, tap on the top-right kebab menu and select **"Copy link"** to
copy the Universal Link to your clipboard.

![Copy link to mini app](/copy_link_to_miniapp.png)

<Caption>
  Copy link to mini app on the Developers page or the Mini App screen.
</Caption>

### How to control what is displayed when I share a Universal Link

Farcaster automatically generates OpenGraph meta tags for Universal Links, ensuring
they render correctly when shared on social platforms or web apps that support embedded
link previews, such as X.

To make sure your Mini App displays as intended, include the `fc:frame` meta tag on all
Universal Links (see ["Sharing your app"](/docs/guides/sharing)) and add all relevant fields
in your [application config](/docs/guides/publishing#define-your-application-configuration),
especially `ogTitle`, `ogDescription` and `ogImageUrl`.

### How Universal Link sub-paths and query params work

Each Mini App defines a `homeUrl` property in its [application config](/docs/guides/publishing#define-your-application-configuration).
When a user clicks on a Mini App in the Farcaster client's Mini App explorer, a
WebView (on mobile) or iframe (on web) pointing to the `homeUrl` is opened.

If you share a Universal Link with a sub-path and/or query parameters, those are appended
to the `homeUrl`'s path and query string.

For example, if the `homeUrl` is `https://example.com/miniapp/v1` and the Universal
Link is `https://farcaster.xyz/miniapps/12345/example-miniapp/leaderboard?sort=points`, the WebView or iframe will load `https://example.com/miniapp/v1/leaderboard?sort=points`.

### FAQ

**Is there another way to get a Mini App's id?**

Not at the moment.

**How can I map a Mini App Universal Link to a domain?**

The domain is provided in the `fc:miniapp:domain` meta tag.

**When copying the link from the Mini App header, it doesn't copy the Universal Link, why is that?**

Any URL with a valid `fc:frame` meta tag shared in a cast will be treated as a Mini App.
Copying the link from these Mini Apps will copy the original URL shared in the cast, not the canonical Universal Link.

**Can I add a sub-path or query params to the Universal Link copied from the Mini App header?**

Not at the moment. Only the canonical Universal Link or URL shared in the cast will be copied.

**Can I open a Mini App from another Mini App?**

Yes, you can open a Mini App from another Mini App by using the `openMiniApp` action.

This will prompt the user to open the new app. Note that this closes the current app
when the new app is opened and there is no way to navigate back.

import { Caption } from '../../../components/Caption.tsx';

## Interacting with Ethereum wallets

Mini Apps can interact with a user's EVM wallet without needing to worry
about popping open "select your wallet" dialogs or flakey connections.

![users taking onchain action from app](/transaction-preview.png)

<Caption>
  A user minting an NFT using the Warpcast Wallet.
</Caption>

### Getting Started

The Mini App SDK exposes an [EIP-1193 Ethereum Provider
API](https://eips.ethereum.org/EIPS/eip-1193) at `sdk.wallet.getEthereumProvider()`.

We recommend using [Wagmi](https://wagmi.sh) to connect to and interact with
the user's wallet. This is not required but provides high-level hooks for
interacting with the wallet in a type-safe way.

::::steps

#### Setup Wagmi

Use the [Getting Started
guide](https://wagmi.sh/react/getting-started#manual-installation) to setup
Wagmi in your project.

#### Install the connector

Next we'll install a Wagmi connector that will be used to interact with the
user's wallet:

:::code-group

```bash [npm]
npm install @farcaster/miniapp-wagmi-connector
```

```bash [pnpm]
pnpm add @farcaster/miniapp-wagmi-connector
```

```bash [yarn]
yarn add @farcaster/miniapp-wagmi-connector
```

:::

#### Add to Wagmi configuration

Add the Mini App connector to your Wagmi config:

```ts
import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [miniAppConnector()],
});
```

#### Connect to the wallet

If a user already has a connected wallet the connector will automatically
connect to it (e.g. `isConnected` will be true).

It's possible a user doesn't have a connected wallet so you should always check
for a connection and prompt them to connect if they aren't already connected:

```tsx
import { useAccount, useConnect } from "wagmi";

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <>
        <div>You're connected!</div>
        <div>Address: {address}</div>
      </>
    );
  }

  return (
    <button type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </button>
  );
}
```

:::note
Your Mini App won't need to show a wallet selection dialog that is common in a
web based dapp, the Farcaster client hosting your app will take care of getting
the user connected to their preferred crypto wallet.
:::

#### Send a transaction

You're now ready to prompt the user to transact. They will be shown a preview
of the transaction in their wallet and asked to confirm it:

Follow [this guide from
Wagmi](https://wagmi.sh/react/guides/send-transaction#_2-create-a-new-component)
on sending a transaction (note: skip step 1 since you're already connected to
the user's wallet).
::::

### Additional Features

#### Batch Transactions

The Farcaster Wallet now supports EIP-5792 `wallet_sendCalls`, allowing you to batch multiple transactions into a single user confirmation. This improves the user experience by enabling operations like "approve and swap" in one step.

Common use cases include:

- Approving a token allowance and executing a swap
- Multiple NFT mints in one operation
- Complex DeFi interactions requiring multiple contract calls

##### Using Batch Transactions

With Wagmi's `useSendCalls` hook, sending multiple transactions as a batch is simple:

```tsx
import { useSendCalls } from "wagmi";
import { parseEther } from "viem";

function BatchTransfer() {
  const { sendCalls } = useSendCalls();

  return (
    <button
      onClick={() =>
        sendCalls({
          calls: [
            {
              to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
              value: parseEther("0.01"),
            },
            {
              to: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
              value: parseEther("0.02"),
            },
          ],
        })
      }
    >
      Send Batch Transfer
    </button>
  );
}
```

##### Example: Token Approval and Swap

```tsx
import { useSendCalls } from "wagmi";
import { encodeFunctionData, parseUnits } from "viem";

function ApproveAndSwap() {
  const { sendCalls } = useSendCalls();

  const handleApproveAndSwap = () => {
    sendCalls({
      calls: [
        // Approve USDC
        {
          to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: "approve",
            args: [
              "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
              parseUnits("100", 6),
            ],
          }),
        },
        // Swap USDC for ETH
        {
          to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
          data: encodeFunctionData({
            abi: uniswapAbi,
            functionName: "swapExactTokensForETH",
            args: [
              /* swap parameters */
            ],
          }),
        },
      ],
    });
  };

  return <button onClick={handleApproveAndSwap}>Approve & Swap</button>;
}
```

All transactions are individually validated and scanned for security, maintaining the same safety guarantees as single transactions.

:::note
**Limitations:**

- Transactions execute sequentially, not atomically
- No paymaster support yet
- Available on all EVM chains Farcaster supports

Use individual transactions when you need to check outputs between calls.
:::

### Troubleshooting

#### Transaction Scanning

Modern crypto wallets scan transactions and preview them to users to help
protect users from scams. New contracts and applications can generate false
positives in these systems. If your transaction is being reported as
potentially malicious use this [Blockaid
Tool](https://report.blockaid.io/verifiedProject) to verify your app with
Blockaid.

## Back Navigation

Integrate with a back navigation control provided by the Farcaster client.

### Usage

If your application is already using [browser-based navigation](#web-navigation-integration), you can
integrate in one line with:

```ts
await sdk.back.enableWebNavigation();
```

That's it! When there is a page to go back to a [back control](#back-control) will be made
available to the user.

Otherwise, you can set a custom back handler and show the back control:

```ts
sdk.back.onback = () => {
  // trigger back in your app
};

await sdk.back.show();
```

### Back control

The back control will vary depending on the user's device and platform but will
generally follow:

- a clickable button in the header on web
- a horizontal swipe left gesture on iOS
- the Android native back control on Android which could be a swipe left
  gesture combined with a virtual or physical button depending on the device

### Web Navigation integration

The SDK can automatically integrate with web navigation APIs.

#### `enableWebNavigation()`

Enables automatic integration with the browser's navigation system. This will:

- Use the modern Navigation API when available; the back button will automatically
  be shown and hidden based on the value of `canGoBack`.
- Fall back to the History API in browsers where Navigation is [not
  supported](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API#browser_compatibility)
  ; the back button will always be shown.

```ts
await sdk.back.enableWebNavigation();
```

#### `disableWebNavigation()`

Disables web navigation integration.

```ts
await sdk.back.disableWebNavigation();
```

### Properties

#### `enabled`

- **Type**: `boolean`
- **Description**: Whether back navigation is currently enabled

#### `onback`

- **Type**: `() => unknown`
- **Description**: Function to call when a back event is triggered. You don't need to
  set this when using `enableWebNavigation`.

### Methods

#### `show()`

Makes the back button visible.

```ts
await sdk.back.show();
```

#### `hide()`

Hides the back button.

```ts
await sdk.back.hide();
```

### Events

When a user triggers the back control the SDK will emit an
`backNavigationTriggered` event. You can add an event listener on `sdk` or use
`sdk.back.onback` to respond to these events.

If you are using `enableWebNavigation` this event will automatically be
listened to and trigger the browser to navigate. Otherwise you should listen
for this event and respond to it as appropriate for your application.

### Availability

You can check whether the Farcaster client rendering your app supports a back control:

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

const capabilities = await sdk.getCapabilities();

if (capabilities.includes("back")) {
  await sdk.back.enableWebNavigation();
} else {
  // show a back button within your app
}
```

### Example: Web Navigation

```ts
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Enable web navigation integration
    sdk.back.enableWebNavigation();
  }, []);

  return <div>{/* Your app content */}</div>;
}
```

### Example: Manual

```ts
function NavigationExample() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    // Update back button based on current page
    if (currentPage === "home") {
      sdk.back.show();
    } else {
      sdk.back.hide();
    }
  }, [currentPage]);

  const handleBack = () => {
    if (currentPage !== "home") {
      setCurrentPage("home");
    }
  };

  // Listen for back navigation events
  useEffect(() => {
    sdk.on("backNavigationTriggered", handleBack);
    return () => sdk.off("backNavigationTriggered", handleBack);
  }, [currentPage]);

  return (
    <div>
      {currentPage === "home" ? (
        <HomePage onNavigate={setCurrentPage} />
      ) : (
        <SubPage />
      )}
    </div>
  );
}
```

## What's New

### December 19, 2024

- Added experimental [`signManifest`](/docs/sdk/actions/sign-manifest) action for domain manifest verification:
  - Signs domain manifests for authenticity verification
  - Returns structured response with header, payload, and signature
  - Available under `sdk.experimental.signManifest()`

### July 25, 2025

- Added support for EIP-5792 batch transactions in Farcaster Wallet:
  - Mini Apps can now use `wallet_sendCalls` to batch multiple transactions into a single user confirmation
  - Supports common patterns like "approve and transfer" in one operation
  - Transactions are executed sequentially with full security scanning
  - Note: Atomic execution and paymaster support are not yet available

### June 9, 2025 (0.0.61)

- Moved Quick Auth out of experimental and enhanced functionality:
  - Use `sdk.quickAuth.getToken()` in place of `sdk.experimental.quickAuth()`.
    `getToken` will store the token in memory and return if it not expired,
    otherwise a new token will be fetched. Developers no longer need to manage
    keeping this token around or checking expiration and can make calls to
    `getToken` whenever needed.
  - Added `fetch` which is a wrapper around the browser Fetch API that
    adds a Quick Auth token as a Bearer token in the `Authorization` header.

### June 6, 2025 (0.0.59)

- Added [`cast_share`](/docs/guides/share-extension) location type for [share extensions](/docs/guides/share-extension), enabling Mini Apps to receive shared casts from the system share sheet
- Extended the cast object in `cast_embed` and `cast_share` contexts to include comprehensive metadata (author details, timestamps, mentions, embeds, channel)

### June 4, 2025 (0.0.56)

- Added [`back`](/docs/sdk/back) SDK API for integrating back control
- Added [`haptics`](/docs/sdk/haptics) SDK methods for triggering haptic feedback (impact, notification, and selection)

### June 1, 2025 (0.0.52)

- Added [`viewCast`](/docs/sdk/actions/view-cast) action to open a specific cast in the Farcaster client
- Added `channelKey` parameter to [`composeCast`](/docs/sdk/actions/compose-cast) action
- Updated `composeCast` result to allow `null` cast when user cancels

### May 21, 2025 (0.0.49)

- Introduced [Wallet Standard integration](/docs/guides/solana) for Solana wallets
- Moved Solana provider to `wallet.getSolanaProvider()`. Will remain accessible at `experimental.getSolanaProvider()` for a couple versions

### May 20, 2025 (0.0.48)

- Added experimental support for `quickAuth`.

### May 16, 2025 (0.0.45)

- Added experimental support for [Solana](/docs/guides/solana)
- Added optional `requiredChains` / `requiredCapabilities` parameters to [manifest](/docs/guides/publishing#host-a-manifest-file)
- Added `getChains` / `getCapabilities` SDK methods to [detect host capabilities](/docs/sdk/detecting-capabilities)
- Replaced `wallet.ethProvider` SDK getter with `wallet.getEthereumProvider()` method
- Replaced `actions.addFrame()` SDK method with `actions.addMiniApp()` method

### May 2, 2025 (0.0.38)

- Added [`isInMiniApp`](/docs/sdk/is-in-mini-app) function to reliably detect Mini App environments

### April 30, 2025 (0.0.37)

- Added experimental actions for [`swapToken`](/docs/sdk/actions/swap-token), [`sendToken`](/docs/sdk/actions/send-token), and [`viewToken`](/docs/sdk/actions/view-token)

### April 22, 2025 (0.0.36)

- Added `noindex` field to manifest (see [discussions/204](https://github.com/farcasterxyz/miniapps/discussions/204))

### April 16, 2025 (0.0.35)

- Introduced new manifest metadata fields (see [discussions/191](https://github.com/farcasterxyz/miniapps/discussions/191))
- Deprecated `imageUrl` and `buttonTitle` (see [discussions/194](https://github.com/farcasterxyz/miniapps/discussions/194))
- Made `url` optional in `actionLaunchFrameSchema` - when not provided, it defaults to the current webpage URL (including query parameters) (see [discussions/189](https://github.com/farcasterxyz/miniapps/discussions/189))

### April 6, 2024 (0.0.34)

- Increased URL max length to 1024 characters

## Compatibility

The goal for mini apps to build once, ship everywhere.

This guide tracks known incompatibilities as we work towards that goal.

### Base App

Below is a list of the main incompatibilities Base App is actively working on fixing. For more information on how mini apps work in Base App, please refer to [these docs](https://docs.base.org/mini-apps).

- `sdk.actions.addMiniApp` (ETA early October, more info soon!)
- `sdk.experimental.signManifest` (ETA early October, more info soon!)

## Context

When your app is opened it can access information about the session from
`sdk.context`. This object provides basic information about the user, the
client, and where your app was opened from:

```ts
export type MiniAppPlatformType = "web" | "mobile";

export type MiniAppContext = {
  user: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
  location?: MiniAppLocationContext;
  client: {
    platformType?: MiniAppPlatformType;
    clientFid: number;
    added: boolean;
    safeAreaInsets?: SafeAreaInsets;
    notificationDetails?: MiniAppNotificationDetails;
  };
  features?: {
    haptics: boolean;
    cameraAndMicrophoneAccess?: boolean;
  };
};
```

### Properties

#### `location`

Contains information about the context from which the Mini App was launched.

```ts
export type MiniAppUser = {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
};

export type MiniAppCast = {
  author: MiniAppUser;
  hash: string;
  parentHash?: string;
  parentFid?: number;
  timestamp?: number;
  mentions?: MiniAppUser[];
  text: string;
  embeds?: string[];
  channelKey?: string;
};

export type CastEmbedLocationContext = {
  type: "cast_embed";
  embed: string;
  cast: MiniAppCast;
};

export type CastShareLocationContext = {
  type: "cast_share";
  cast: MiniAppCast;
};

export type NotificationLocationContext = {
  type: "notification";
  notification: {
    notificationId: string;
    title: string;
    body: string;
  };
};

export type LauncherLocationContext = {
  type: "launcher";
};

export type ChannelLocationContext = {
  type: "channel";
  channel: {
    /**
     * Channel key identifier
     */
    key: string;

    /**
     * Channel name
     */
    name: string;

    /**
     * Channel profile image URL
     */
    imageUrl?: string;
  };
};

export type OpenMiniAppLocationContext = {
  type: "open_miniapp";
  referrerDomain: string;
};

export type LocationContext =
  | CastEmbedLocationContext
  | CastShareLocationContext
  | NotificationLocationContext
  | LauncherLocationContext
  | ChannelLocationContext
  | OpenMiniAppLocationContext;
```

##### Cast Embed

Indicates that the Mini App was launched from a cast (where it is an embed).

```ts
> sdk.context.location
{
  type: "cast_embed",
  embed: "https://myapp.example.com",
  cast: {
    author: {
      fid: 3621,
      username: "alice",
      displayName: "Alice",
      pfpUrl: "https://example.com/alice.jpg"
    },
    hash: "0xa2fbef8c8e4d00d8f84ff45f9763b8bae2c5c544",
    timestamp: 1749160866000,
    mentions: [],
    text: "Check out this awesome mini app!",
    embeds: ["https://myapp.example.com"],
    channelKey: "farcaster"
  }
}
```

##### Cast Share

Indicates that the Mini App was launched when a user shared a cast to your app (similar to sharing content to an app on mobile platforms).

```ts
> sdk.context.location
{
  type: "cast_share",
  cast: {
    author: {
      fid: 12152,
      username: "pirosb3",
      displayName: "Daniel - Bountycaster",
      pfpUrl: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/7229dfa5-4873-42d0-9dd0-69f4f3fc4d00/original"
    },
    hash: "0x1177603a7464a372fc358a7eabdeb70880d81612",
    timestamp: 1749160866000,
    mentions: [],
    text: "Sharing this interesting cast with you!",
    embeds: ["https://frames-v2.vercel.app/"],
    channelKey: "staging"
  }
}
```

##### Notification

Indicates that the Mini App was launched from a notification triggered by the frame.

```ts
> sdk.context.location
{
  type: "notification",
  notification: {
    notificationId: "f7e9ebaf-92f0-43b9-a410-ad8c24f3333b"
    title: "Yoinked!",
    body: "horsefacts captured the flag from you.",
  }
}
```

##### Launcher

Indicates that the Mini App was launched directly by the client app outside of a context, e.g. via some type of catalog or a notification triggered by the client.

```ts
> sdk.context.location
{
  type: "launcher"
}
```

##### Open Mini App

Indicates that the Mini App was launched from another Mini App using the `openMiniApp` action. This enables app-to-app navigation and referral tracking.

```ts
> sdk.context.location
{
  type: "open_miniapp",
  referrerDomain: "example-app.com"
}
```

The `referrerDomain` contains the domain of the Mini App that opened the current app. This can be used for:

- Tracking referrals and attribution
- Customizing the experience based on the referring app
- Building app-to-app workflows

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

##### Cast Object Structure

When your Mini App is launched from a cast context (either `cast_embed` or `cast_share`), you receive a comprehensive cast object with the following metadata:

- **author**: The user who created the cast, including their FID, username, display name, and profile picture
- **hash**: The unique identifier for the cast
- **parentHash** (optional): If this is a reply, the hash of the parent cast
- **parentFid** (optional): If this is a reply, the FID of the parent cast author
- **timestamp** (optional): Unix timestamp in milliseconds when the cast was created
- **mentions** (optional): Array of users mentioned in the cast
- **embeds** (optional): Array of URLs embedded in the cast
- **channelKey** (optional): The channel where the cast was posted

#### `user`

Details about the calling user which can be used to customize the interface. This should be considered untrusted since it is passed in by the application, and there is no guarantee that it was authorized by the user.

```ts
export type AccountLocation = {
  placeId: string;

  /**
   * Human-readable string describing the location
   */
  description: string;
};

export type UserContext = {
  fid: number;
  username?: string;
  displayName?: string;

  /**
   * Profile image URL
   */
  pfpUrl?: string;
  location?: AccountLocation;
};
```

```ts
> sdk.context.user
{
  "fid": 6841,
  "username": "deodad",
  "displayName": "Tony D'Addeo",
  "pfpUrl": "https://i.imgur.com/dMoIan7.jpg",
  "bio": "Building @warpcast and @farcaster, new dad, like making food",
  "location": {
    "placeId": "ChIJLwPMoJm1RIYRetVp1EtGm10",
    "description": "Austin, TX, USA"
  }
}
```

```ts
type User = {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
  location?: {
    placeId: string;
    description: string;
  };
};
```

#### client

Details about the Farcaster client running the Mini App. This should be considered untrusted

- `platformType`: indicates whether the Mini App is running on 'web' or 'mobile' platform
- `clientFid`: the self-reported FID of the client (e.g. 9152 for Warpcast)
- `added`: whether the user has added the Mini App to the client
- `safeAreaInsets`: insets to avoid areas covered by navigation elements that obscure the view
- `notificationDetails`: in case the user has enabled notifications, includes the `url` and `token` for sending notifications

```ts
export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ClientContext = {
  platformType?: MiniAppPlatformType;
  clientFid: number;
  added: boolean;
  notificationDetails?: MiniAppNotificationDetails;
  safeAreaInsets?: SafeAreaInsets;
};
```

```ts
> sdk.context.client
{
  platformType: "mobile",
  clientFid: 9152,
  added: true,
  safeAreaInsets: {
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
  };
  notificationDetails: {
    url: "https://api.farcaster.xyz/v1/frame-notifications",
    token: "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```ts
type MiniAppNotificationDetails = {
  url: string;
  token: string;
};

type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type ClientContext = {
  platformType?: MiniAppPlatformType;
  clientFid: number;
  added: boolean;
  safeAreaInsets?: SafeAreaInsets;
  notificationDetails?: MiniAppNotificationDetails;
};
```

##### Using safeAreaInsets

Mobile devices render navigation elements that obscure the view of an app. Use
the `safeAreaInsets` to render content in the safe area that won't be obstructed.

A basic usage would to wrap your view in a container that adds margin:

```
<div style={{
  marginTop: context.client.safeAreaInsets.top,
  marginBottom: context.client.safeAreaInsets.bottom,
  marginLeft: context.client.safeAreaInsets.left,
  marginRight: context.client.safeAreaInsets.right,
}}>
  ...your app view
</div>
```

However, you may want to set these insets on specific elements: for example if
you have tab bar at the bottom of your app with a different background, you'd
want to set the bottom inset as padding there so it looks attached to the
bottom of the view.

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

#### features

Optional object that indicates which features are available and their current state in the client.

```ts
export type ClientFeatures = {
  haptics: boolean;
  cameraAndMicrophoneAccess?: boolean;
};
```

- `haptics`: Indicates whether haptic feedback is supported on the current platform
- `cameraAndMicrophoneAccess`: Indicates whether camera and microphone permissions have been granted and stored for this mini app. When `true`, the user has previously granted access and won't be prompted again. This field is optional and may not be present on all platforms.

```ts
> sdk.context.features
{
  haptics: true,
  cameraAndMicrophoneAccess: true
}
```

##### Using features for capability detection

You can use the `features` object to conditionally enable functionality based on platform support:

```ts
// Check if camera/microphone is available before using it
if (context.features?.cameraAndMicrophoneAccess) {
  // Camera and microphone access is available and granted
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
} else {
  // Feature not supported or permissions not granted
  console.log("Camera/microphone not available");
}
```

**Note:** For more fine-grained capability detection, use the [`getCapabilities()`](/docs/sdk/detecting-capabilities#getcapabilities) method which returns specific SDK methods supported by the host.

Example usage with `getCapabilities()`:

```ts
import { sdk } from "@farcaster/miniapp-sdk";

// Get list of supported capabilities
const capabilities = await sdk.getCapabilities();

// Check if specific haptic methods are supported
if (capabilities.includes("haptics.impactOccurred")) {
  // Impact haptic feedback is available
  await sdk.haptics.impactOccurred("medium");
}
```

## Detecting chains & capabilities

Mini Apps are rendered within "hosts" inside web and mobile apps. Not all hosts support the same feature set, but some Mini Apps might require specific features.

If your Mini App requires a given feature, you can declare that feature in your manifest. Alternately, if your Mini App optionally supports a given feature, it can detect the supported set of features at runtime.

### Declaring requirements in your manifest

If your Mini App relies on certain blockchains or SDK methods, you can declare those in your manifest via the properties `requiredChains` and `requiredCapabilities`.

#### `requiredChains`

`miniapp.requiredChains` is an optional [manifest](/docs/guides/publishing#host-a-manifest-file) property that contains an array of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) identifiers. If the host does not support all of the chains declared here, it will know not to try rendering your Mini App.

Note that only the chains listed in `chainList` [here](https://github.com/farcasterxyz/miniapps/blob/main/packages/miniapp-core/src/schemas/manifest.ts) are supported. If your manifest omits `requiredChains`, then the mini app host will assume that no chains are required.

#### `requiredCapabilities`

`miniapp.requiredCapabilities` is an optional [manifest](/docs/guides/publishing#host-a-manifest-file) property that contains an array of paths to SDK methods, such as `wallet.getEthereumProvider` or `actions.composeCast`. If the host does not support all of the capabilities declared here, it will know not to try rendering your Mini App.

The full list of supported SDK methods can be found in `miniAppHostCapabilityList` [here](https://github.com/farcasterxyz/miniapps/blob/main/packages/miniapp-core/src/types.ts). If your manifest omits `requiredCapabilities`, then the mini app host will assume that no capabilities are required.

### Runtime detection

If your Mini App optionally supports certain blockchains or SDK methods, you can detect whether they are supported at runtime via SDK calls.

#### `getChains`

This SDK method returns a list of supported blockchains as an array of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) identifiers.

#### `getCapabilities`

This SDK method returns a list of supported SDK methods as an array of paths to those SDK methods. The full list of supported SDK methods can be found in `miniAppHostCapabilityList` [here](https://github.com/farcasterxyz/miniapps/blob/main/packages/miniapp-core/src/types.ts).

##### Example

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// Get all supported capabilities
const capabilities = await sdk.getCapabilities();

// Check for specific capabilities
const supportsCompose = capabilities.includes("actions.composeCast");
const supportsWallet = capabilities.includes("wallet.getEthereumProvider");

// Check for haptics support
const supportsHaptics = {
  impact: capabilities.includes("haptics.impactOccurred"),
  notification: capabilities.includes("haptics.notificationOccurred"),
  selection: capabilities.includes("haptics.selectionChanged"),
};

// Use capabilities conditionally
if (supportsHaptics.impact) {
  await sdk.haptics.impactOccurred("medium");
}
```

## Client Events

When a user interacts with your app events will be sent from the Farcaster
client to your application client.

Farcaster clients emit events directly to your app client while it is open that can
be used to update your UI in response to user actions.

To listen to events, you have to use `sdk.on` to register callbacks ([see full
example](https://github.com/farcasterxyz/frames-v2-demo/blob/20d454f5f6b1e4f30a6a49295cbd29ca7f30d44a/src/components/Demo.tsx#L92-L124)).

Listeners can be cleaned up with `sdk.removeListener()` or sdk.removeAllListeners()\`.

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

### Events

#### miniappAdded

The user added the Mini App.

#### miniappRemoved

The user removed the Mini App.

#### notificationsEnabled

The user enabled notifications after previously having them disabled.

#### notificationsDisabled

The user disabled notifications.

import { Caption } from '../../../components/Caption.tsx';

## Haptics

Provides haptic feedback to enhance user interactions through physical sensations. The haptics API includes three methods for different types of feedback: impact, notification, and selection.

### Usage

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// Trigger impact feedback
await sdk.haptics.impactOccurred("medium");

// Trigger notification feedback
await sdk.haptics.notificationOccurred("success");

// Trigger selection feedback
await sdk.haptics.selectionChanged();
```

### Methods

#### impactOccurred

Triggers impact feedback, useful for simulating physical impacts.

##### Parameters

##### type

- **Type:** `'light' | 'medium' | 'heavy' | 'soft' | 'rigid'`

The intensity and style of the impact feedback.

- `light`: A light impact
- `medium`: A medium impact
- `heavy`: A heavy impact
- `soft`: A soft, dampened impact
- `rigid`: A sharp, rigid impact

##### Example

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// Trigger when user taps a button
await sdk.haptics.impactOccurred("light");

// Trigger for more significant actions
await sdk.haptics.impactOccurred("heavy");
```

#### notificationOccurred

Triggers notification feedback, ideal for indicating task outcomes.

##### Parameters

##### type

- **Type:** `'success' | 'warning' | 'error'`

The type of notification feedback.

- `success`: Indicates a successful operation
- `warning`: Indicates a warning or caution
- `error`: Indicates an error or failure

##### Example

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// After successful action
await sdk.haptics.notificationOccurred("success");

// When showing a warning
await sdk.haptics.notificationOccurred("warning");

// On error
await sdk.haptics.notificationOccurred("error");
```

#### selectionChanged

Triggers selection feedback, perfect for UI element selections.

##### Example

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// When user selects an item from a list
await sdk.haptics.selectionChanged();

// When toggling a switch
await sdk.haptics.selectionChanged();
```

### Return Value

All haptic methods return `Promise<void>`.

### Availability

Haptic feedback availability depends on the client device and platform. You can check if haptics are supported using the `getCapabilities()` method:

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

const capabilities = await sdk.getCapabilities();

// Check if specific haptic methods are supported
if (capabilities.includes("haptics.impactOccurred")) {
  await sdk.haptics.impactOccurred("medium");
}

if (capabilities.includes("haptics.notificationOccurred")) {
  await sdk.haptics.notificationOccurred("success");
}

if (capabilities.includes("haptics.selectionChanged")) {
  await sdk.haptics.selectionChanged();
}
```

### Best Practices

1. **Use sparingly**: Overuse of haptic feedback can be distracting
2. **Match intensity to action**: Use light feedback for minor actions, heavy for significant ones
3. **Provide visual feedback too**: Not all devices support haptics
4. **Check availability**: Always verify haptic support before using
5. **Consider context**: Some users may have haptics disabled in their device settings

## isInMiniApp

Determines if the current environment is a Mini App context by analyzing both environment characteristics and communication capabilities.

### Usage

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// Check if running in a Mini App
const isMiniApp = await sdk.isInMiniApp();

if (isMiniApp) {
  // Mini App-specific code
} else {
  // Regular web app code
}
```

### Parameters

#### timeoutMs (optional)

- **Type:** `number`
- **Default:** `100`

Optional timeout in milliseconds for context verification. If the context doesn't resolve within this time, the function assumes it's not in a Mini App environment.

### Return Value

- **Type:** `Promise<boolean>`

Returns a promise that resolves to `true` if running in a Mini App context, or `false` otherwise.

### Details

The function uses a multi-step approach to detect Mini App environments:

1. **Fast Short-Circuit:** Returns `false` immediately in certain scenarios:

   - During server-side rendering
   - When neither in an iframe nor in ReactNative WebView

2. **Context Verification:** For potential Mini App environments (iframe or ReactNative WebView), verifies by checking for context communication.

3. **Result Caching:** Once confirmed to be in a Mini App, the result is cached for faster subsequent calls.

This approach ensures accurate detection while optimizing performance.

:::tip
Need to branch during **server-side rendering**?
See the **Hybrid & SSR-friendly detection** subsection in the [Publishing guide](/docs/guides/publishing#hybrid-detection).
:::

## Solana wallet

The SDK enables Mini Apps to interact with a user's Solana wallet through [Wallet Standard](https://github.com/anza-xyz/wallet-standard/).

Mini apps written in React can use [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter/)'s React hooks, which are sort of like Solana's equivalent of Wagmi. Wallet Adapter also exposes a more low-level interface for non-React apps.

For more information:

- [Wallet Adapter docs](https://anza-xyz.github.io/wallet-adapter/)
- [Guide on interacting with Solana wallets](/docs/guides/solana)

import { Caption } from '../../../components/Caption.tsx';

## Ethereum wallet

![users taking onchain action from app](/transaction-preview.png)

<Caption>
  A user minting an NFT using the Warpcast Wallet.
</Caption>

The SDK exposes an [EIP-1193 Ethereum Provider
](https://eips.ethereum.org/EIPS/eip-1193) at `sdk.wallet.getEthereumProvider()`. You can
interact with this object directly or use it with ecosystem tools like
[Wagmi](https://wagmi.sh/) or [Ethers](https://docs.ethers.org/v6/).

For more information:

- [EIP-1193 Ethereum Provider API](https://eips.ethereum.org/EIPS/eip-1193)
- [Guide on interacting with Ethereum wallets](/docs/guides/wallets)

### Using Neynar to build mini apps

_Neynar is a Farcaster developer platform offering a range of services from nodes and APIs to mini app stack._

#### Mini app stack

- **Mini app starter kit** - Type `npx @neynar/create-farcaster-mini-app@latest` in your terminal to get started. See [here](https://docs.neynar.com/docs/create-farcaster-miniapp-in-60s) for more information.
- **Send notifications to mini app users** - Notification server to send notifications over API or from portal. Includes batching, targeting, etc. Read more [here](https://docs.neynar.com/docs/send-notifications-to-mini-app-users).
- **Convert existing web app to mini app** - Follow guide [here](https://docs.neynar.com/docs/convert-web-app-to-mini-app).
- **Fetch mini apps by categories** - See API [here](https://docs.neynar.com/reference/fetch-frame-catalog)
- **Fetch relevant mini apps for a given user** - See API [here](https://docs.neynar.com/reference/fetch-frame-relevant)
- **Search mini app namespace** - See API [here](https://docs.neynar.com/reference/search-frames)
- **Crawl mini app metadata** - See API [here](https://docs.neynar.com/reference/fetch-frame-meta-tags-from-url)

#### Use with AI

Set up Neynar with MCP server and llms.txt - See instructions [here](https://docs.neynar.com/docs/neynar-farcaster-with-cursor/docs/neynar-farcaster-with-cursor).

_Note: LLMs hallucinate, you will get best results by passing in links to specific docs and references._

#### Links

[Website](https://neynar.com), [Docs](https://docs.neynar.com)

import { Caption } from '../../../../components/Caption.tsx';

## addMiniApp

Prompts the user to add the app.

![adding a mini app in Warpcast](/add_frame_preview.png)

<Caption>
  A user discovers an app from their social feed, adds it, and then sees it
  from their apps screen
</Caption>

### Usage

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.addMiniApp();
```

The `addMiniApp()` action requires your app's domain to exactly match the domain in your manifest file. This means:

- You cannot use tunnel domains (ngrok, localtunnel, etc.) - the action will fail
- Your app must be deployed to the same domain specified in your `farcaster.json`
- For local development, use the preview tool instead of trying to add the app

### Return Value

`void`

### Errors

#### `RejectedByUser`

Thrown if a user rejects the request to add the Mini App.

#### `InvalidDomainManifestJson`

Thrown when an app does not have a valid `farcaster.json` or when the domain doesn't match. Common causes:

- Using a tunnel domain (ngrok, localtunnel) instead of your production domain
- The app's current domain doesn't match the domain in the manifest
- The manifest file is missing or malformed

import { Caption } from '../../../../components/Caption.tsx';

## close

Closes the mini app.

![closing the app](/close_preview.png)

<Caption>
  Close the app with `close`.
</Caption>

### Usage

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.close();
```

### Return Value

`void`

import { Caption } from '../../../../components/Caption.tsx';

## composeCast

Open the cast composer with a suggested cast. The user will be able to modify
the cast before posting it.

![composing a cast](/compose_cast_action.png)

<Caption>
  An app prompts the user to cast and includes an embed.
</Caption>

### Usage

```ts twoslash
/**
 * Cryptographically secure nonce generated on the server and associated with
 * the user's session.
 */
const text = "I just learned how to compose a cast";
const embeds = [
  "https://miniapps.farcaster.xyz/docs/sdk/actions/compose-cast",
] as [string];

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.composeCast({
  text,
  embeds,
});
```

### Parameters

#### text (optional)

- **Type:** `string`

Suggested text for the body of the cast.

Mentions can be included using the human-writeable form (e.g. @farcaster).

#### embeds (optional)

- **Type:** `[] | [string] | [string, string]`

Suggested embeds. Max two.

#### parent (optional)

- **Type:** `{ type: 'cast'; hash: string }`

Suggested parent of the cast.

#### close (optional)

- **Type:** `boolean`

Whether the app should be closed when this action is called. If true the app
will be closed and the action will resolve with no result.

#### channelKey (optional)

- **Type:** `string`

Whether the cast should be posted to a channel.

### Return Value

The cast posted by the user, or `undefined` if set to close.

**Note:** The `cast` property in the result can be `null` if the user decides not to create the cast.

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// ---cut---
const result = await sdk.actions.composeCast({
  //    ^?
  text: "I just learned how to compose a cast",
  embeds: ["https://miniapps.farcaster.xyz/docs/sdk/actions/compose-cast"],
  channelKey: "farcaster", // optional channel
});

// result.cast can be null if user cancels
if (result?.cast) {
  console.log(result.cast.hash);
  console.log(result.cast.channelKey); // includes channel if posted to one
}
```

import { Caption } from '../../../../components/Caption.tsx';

## openMiniApp

Opens another Mini App, providing a seamless way to navigate between Mini Apps within the Farcaster ecosystem.

When you open another Mini App using this method, your current Mini App will close after successful navigation. The target Mini App will receive information about your app as the referrer, enabling referral tracking and app-to-app flows.

### Usage

```ts twoslash
const options = {
  url: "https://www.bountycaster.xyz/bounty/0x983ad3e340fbfef785e0705ff87c0e63c22bebc4",
};

//---cut---
import { sdk } from "@farcaster/miniapp-sdk";

// Open a Mini App using an embed URL
await sdk.actions.openMiniApp({
  url: "https://www.bountycaster.xyz/bounty/0x983ad3e340fbfef785e0705ff87c0e63c22bebc4",
});

// Open a Mini App using a launch URL
await sdk.actions.openMiniApp({
  url: "https://farcaster.xyz/miniapps/WoLihpyQDh7w/farville",
});
```

### Options

```ts
type OpenMiniAppOptions = {
  url: string;
};
```

- `url`: The URL of the Mini App to open. This can be either:
  - A Mini App embed URL (e.g., `https://example.com/specific-page`)
  - A Mini App launch URL (e.g., `https://farcaster.xyz/miniapps/[id]/[name]`)

### Return Value

`Promise<void>` - The promise resolves when navigation is successful. If navigation fails, the promise will be rejected with an error.

### Error Handling

Always await the `openMiniApp` call and handle potential errors:

```ts
import { sdk } from "@farcaster/miniapp-sdk";

try {
  await sdk.actions.openMiniApp({
    url: "https://example.com/miniapp",
  });
  // Navigation successful - your app will close
} catch (error) {
  console.error("Failed to open Mini App:", error);
  // Handle the error - your app remains open
}
```

### Referrer Information

When a Mini App is opened using `openMiniApp`, the target app receives a special location context with referrer information:

```ts
// In the target Mini App:
if (sdk.context.location?.type === "open_miniapp") {
  console.log("Referred by:", sdk.context.location.referrerDomain);
  // e.g., "Referred by: yourminiapp.com"
}
```

### Use Cases

#### Hub or Portfolio Apps

Create a central hub that showcases multiple Mini Apps:

```ts
const miniApps = [
  {
    name: "Farville",
    url: "https://farcaster.xyz/miniapps/WoLihpyQDh7w/farville",
  },
  { name: "Bountycaster", url: "https://www.bountycaster.xyz" },
  { name: "Yoink", url: "https://yoink.party/framesV2/" },
];

function MiniAppHub() {
  const handleOpenApp = async (url: string) => {
    try {
      await sdk.actions.openMiniApp({ url });
    } catch (error) {
      console.error("Failed to open app:", error);
    }
  };

  return (
    <div>
      {miniApps.map((app) => (
        <button key={app.name} onClick={() => handleOpenApp(app.url)}>
          Open {app.name}
        </button>
      ))}
    </div>
  );
}
```

#### Referral Systems

Implement referral tracking between Mini Apps:

```ts
// In the source Mini App
const referralUrl = "https://partner-app.com/campaign?ref=myapp";
await sdk.actions.openMiniApp({ url: referralUrl });

// In the target Mini App
if (sdk.context.location?.type === "open_miniapp") {
  // Track the referral
  analytics.track("referral_received", {
    referrer: sdk.context.location.referrerDomain,
    campaign: new URL(window.location.href).searchParams.get("ref"),
  });
}
```

### Important Notes

- Your Mini App will close after successful navigation
- The action works the same way on both web and mobile platforms
- The target app must be a valid Mini App with a proper manifest
- Always handle errors as navigation may fail for various reasons

import { Caption } from '../../../../components/Caption.tsx';

## openUrl

Opens an external URL.

If a user is on mobile `openUrl` can be used to deeplink
users into different parts of the Farcaster client they
are using.

![opening a url](/open_url_preview.png)

<Caption>
  Opening an external url with `openUrl`.
</Caption>

### Usage

```ts twoslash
const url = "https://farcaster.xyz";

//---cut---
import { sdk } from "@farcaster/miniapp-sdk";

// Pass URL as a string
await sdk.actions.openUrl(url);

// Or pass URL as an object
await sdk.actions.openUrl({ url: "https://farcaster.xyz" });
```

### Return Value

`void`

import { Caption } from '../../../../components/Caption.tsx';

## ready

Hides the Splash Screen. Read the [guide on loading your app](/docs/guides/loading) for best practices.

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

![calling ready to hide the splash screen](/ready_preview.png)

<Caption>
  Dismiss the Splash Screen with ready.
</Caption>

### Usage

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.ready();
```

### Parameters

#### disableNativeGestures (optional)

- **Type:** `boolean`
- **Default:** `false`

Disable native gestures. Use this option if your frame uses gestures
that conflict with native gestures like swipe to dismiss.

### Return Value

`void`

## requestCameraAndMicrophoneAccess

Request permission to access the device's camera and microphone. This method triggers a permission dialog in the host app and stores the user's preference so they won't be asked again for the same mini app.

:::note
This is an experimental feature that stores camera and microphone permission settings per mini app. The stored preference ensures users aren't repeatedly prompted for the same permissions. Check the `features.cameraAndMicrophoneAccess` flag in the SDK context to determine if permissions have been granted.
:::

### Usage

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

try {
  await sdk.actions.requestCameraAndMicrophoneAccess();
  console.log("Camera and microphone access granted");
  // You can now use camera and microphone in your mini app
} catch (error) {
  console.log("Camera and microphone access denied");
  // Handle the denial gracefully
}
```

### Return Value

Returns a `Promise<void>` that:

- **Resolves** when the user grants permission
- **Rejects** when the user denies permission or dismisses the dialog

### Feature Detection

Before using this action, check if it's supported:

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// Check if the feature is available
const context = await sdk.context;
if (context.features?.cameraAndMicrophoneAccess) {
  // Feature is supported and permissions have been granted
  // You can use camera/microphone features
} else {
  // Feature is not supported or permissions not granted
}
```

### Permissions

- The permission dialog will only be shown once per mini app - the user's choice is stored
- If the user has previously granted or denied permissions, the stored preference is used and the promise will immediately resolve or reject without showing a dialog
- The stored permissions ensure users aren't repeatedly asked for the same access
- Users can revoke permissions at any time by:
  1. Opening the mini app
  2. Tapping the options menu (three dots)
  3. Toggling the camera and microphone access switch

### Example: Video Recording

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

async function startVideoRecording() {
  try {
    // Request permissions first
    await sdk.actions.requestCameraAndMicrophoneAccess();

    // Now you can access getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // Use the stream for video recording
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.srcObject = stream;
    }
  } catch (error) {
    if (error instanceof Error && error.name === "NotAllowedError") {
      // Permissions were denied
      alert("Camera and microphone access is required for video recording");
    } else {
      console.error("Failed to start recording:", error);
    }
  }
}
```

### Platform Support

| Platform | Supported | Notes                                      |
| -------- | --------- | ------------------------------------------ |
| iOS      | ✅        | Full support with domain-level permissions |
| Android  | ✅        | Supported (see note below)                 |
| Web      | ❌        | Not currently supported                    |

:::note
On Android, camera and microphone permissions work slightly differently than iOS. Once permissions are granted to the host app, mini apps may have access without additional prompts. This is standard behavior for Android WebView permissions.
:::

:::warning
Camera and microphone access is not supported in web mini apps. The action will always reject on web platforms.
:::

## sendToken

Open the send form with a pre-filled token and recipient. The user will be able to modify
the send before executing the transaction.

### Usage

```ts twoslash
const token = "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const amount = "1000000";
const recipientFid = 3;

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.sendToken({
  token,
  amount,
  recipientFid,
});
```

### Parameters

#### token (optional)

- **Type:** `string`

CAIP-19 asset ID

For example, Base USDC: eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

#### amount (optional)

- **Type:** `string`

Send token amount, as numeric string

For example, 1 USDC: 1000000

#### recipientAddress (optional)

- **Type:** `string`

Address to send the token to

For example, 0xd8da6bf26964af9d7eed9e03e53415d37aa96045

#### recipientFid (optional)

- **Type:** `number`

FID to send the token to

For example, dwr: 3

### Return Value

```ts twoslash
type SendTokenDetails = {
  /**
   * Tx identifier.
   */
  transaction: `0x${string}`;
};

type SendTokenErrorDetails = {
  /**
   * Error code.
   */
  error: string;
  /**
   * Error message.
   */
  message?: string;
};

export type SendTokenErrorReason = "rejected_by_user" | "send_failed";

export type SendTokenResult =
  | {
      success: true;
      send: SendTokenDetails;
    }
  | {
      success: false;
      reason: SendTokenErrorReason;
      error?: SendTokenErrorDetails;
    };
```

import { Caption } from '../../../../components/Caption.tsx';

## signIn

Request a [Sign in with Farcaster
(SIWF)](https://docs.farcaster.xyz/developers/siwf/) credential from the user.

See the guide on [authenticating users](/docs/guides/auth).

![signing in a user](/sign_in_preview.png)

<Caption>
  A user opens an app and is automatically signed in
</Caption>

### Usage

```ts twoslash
/**
 * Cryptographically secure nonce generated on the server and associated with
 * the user's session.
 */
const nonce = "securenonce";

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.signIn({
  nonce,
  acceptAuthAddress: true,
});
```

### Parameters

#### nonce

- **Type:** `string`

A random string used to prevent replay attacks, at least 8 alphanumeric
characters.

#### acceptAuthAddress

- **Type:** `boolean`

Whether an [Auth
Address](https://github.com/farcasterxyz/protocol/discussions/225) signed
message is acceptable. Defaults to `true` for the best user experience.
Set to `false` if your verification method does not support auth addresses.

### Return Value

The SIWF message and signature.

```ts
type SignInResult = {
  signature: string;
  message: string;
};
```

:::note
This message must be sent to your server and verified. See the guide on
[authenticating with Farcaster](/docs/guides/auth) for more information.
:::

### Errors

#### `RejectedByUser`

Thrown if a user rejects the sign-in request.

```ts
try {
  const result = await sdk.actions.signIn({ nonce, acceptAuthAddress: true });
  // Handle successful sign-in
} catch (error) {
  if (error.name === "RejectedByUser") {
    // Handle user rejection
  }
}
```

[If you're an AI agent or LLM, please read this.](/docs/guides/agents-checklist)

import { Caption } from '../../../../components/Caption.tsx';

## signManifest (Experimental)

:::warning
This is an experimental feature and may change or be removed in future versions.
:::

\:::warning Host Discretion
The availability and behavior of `signManifest` depends entirely on the host implementation. Hosts may choose to:

- Enable manifest signing for all domains
- Restrict signing to specific allowlisted domains
- Disable the feature entirely
- Implement additional validation requirements

Check with your specific host's documentation for their manifest signing policies.
\:::

Signs a domain manifest for verification and authenticity purposes.

### Usage

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

const result = await sdk.experimental.signManifest({
  domain: "example.com",
});
```

### Parameters

#### `options`

- **domain** (required): The domain to sign the manifest for

### Return Value

Returns an object with the following properties:

- **header**: The header component of the signed manifest
- **payload**: The payload component containing the domain data
- **signature**: The cryptographic signature

```ts
{
  header: string;
  payload: string;
  signature: string;
}
```

### Errors

#### `RejectedByUser`

Thrown if a user rejects the request to sign the manifest.

```ts
try {
  await sdk.experimental.signManifest({ domain: "example.com" });
} catch (error) {
  if (error instanceof SignManifest.RejectedByUser) {
    // Handle user rejection
  }
}
```

#### `InvalidDomain`

Thrown when the provided domain is invalid or malformed.

```ts
try {
  await sdk.experimental.signManifest({ domain: "invalid-domain" });
} catch (error) {
  if (error instanceof SignManifest.InvalidDomain) {
    // Handle invalid domain
  }
}
```

#### `GenericError`

Thrown when manifest signing fails for various reasons including host restrictions, network issues, or other implementation-specific failures.

```ts
try {
  await sdk.experimental.signManifest({ domain: "example.com" });
} catch (error) {
  if (error instanceof SignManifest.GenericError) {
    // Handle generic signing failures
    console.log("Signing failed:", error.message);
  }
}
```

#### Generic Error Handling

For robust error handling, you should catch all specific error types:

```ts
try {
  const result = await sdk.experimental.signManifest({ domain: "example.com" });
  // Handle successful signing
} catch (error) {
  if (error instanceof SignManifest.RejectedByUser) {
    // User declined to sign the manifest
    console.log("User rejected manifest signing");
  } else if (error instanceof SignManifest.InvalidDomain) {
    // Domain format is invalid
    console.log("Invalid domain format");
  } else if (error instanceof SignManifest.GenericError) {
    // Generic signing failures
    console.log("Signing failed:", error.message);
    // This could include:
    // - Domain not allowlisted by host
    // - Feature disabled by host
    // - Network or connectivity issues
    // - Host-specific validation failures
  } else {
    // Other unexpected errors
    console.log("Manifest signing failed:", error.message);
    // This could include network or authentication errors
  }
}
```

## swapToken

Open the swap form with pre-filled tokens. The user will be able to modify
the swap before executing the transaction.

### Usage

```ts twoslash
const sellToken =
  "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const buyToken = "eip155:10/native";
const sellAmount = "1000000";

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.swapToken({
  sellToken,
  buyToken,
  sellAmount,
});
```

### Parameters

#### sellToken (optional)

- **Type:** `string`

CAIP-19 asset ID

For example, Base USDC: eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

#### buyToken (optional)

- **Type:** `string`

CAIP-19 asset ID

For example, OP ETH: eip155:10/native

#### sellAmount (optional)

- **Type:** `string`

Sell token amount, as numeric string

For example, 1 USDC: 1000000

### Return Value

```ts twoslash
type SwapTokenDetails = {
  /**
   * Array of tx identifiers in order of execution.
   * Some swaps will have both an approval and swap tx.
   */
  transactions: `0x${string}`[];
};

type SwapTokenErrorDetails = {
  /**
   * Error code.
   */
  error: string;
  /**
   * Error message.
   */
  message?: string;
};

export type SwapErrorReason = "rejected_by_user" | "swap_failed";

export type SwapTokenResult =
  | {
      success: true;
      swap: SwapTokenDetails;
    }
  | {
      success: false;
      reason: SwapErrorReason;
      error?: SwapTokenErrorDetails;
    };
```

import { Caption } from '../../../../components/Caption.tsx';

## viewCast

Open a specific cast in the Farcaster client. This navigates the user to view
the full cast with its replies and reactions.

### Usage

```ts twoslash
const castHash = "0x1234567890abcdef";

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.viewCast({
  hash: castHash,
});
```

### Parameters

#### hash

- **Type:** `string`

The hash of the cast to view. This should be a valid cast hash from the Farcaster protocol.

#### close (optional)

- **Type:** `boolean`

Whether the app should be closed when this action is called. If true, the app
will be closed after opening the cast view.

### Return Value

`Promise<void>` - This action does not return a value. It triggers navigation to the cast view in the Farcaster client.

```ts twoslash
import { sdk } from "@farcaster/miniapp-sdk";

// ---cut---
// View a specific cast
await sdk.actions.viewCast({
  hash: "0x1234567890abcdef",
});

// View a cast and close the mini app
await sdk.actions.viewCast({
  hash: "0x1234567890abcdef",
  close: true,
});
```

import { Caption } from '../../../../components/Caption.tsx';

## viewProfile

Displays a user's Farcaster profile.

![viewing a profile from an app](/view_profile_preview.png)

<Caption>
  Viewing a profile and follow a user from an app.
</Caption>

### Usage

```ts twoslash
const fid = 6841;

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.viewProfile({
  fid,
});
```

### Parameters

#### fid

- **Type:** `number`

Farcaster ID of the user whose profile to view.

### Return Value

`void`

## viewToken

Displays a token

### Usage

```ts twoslash
const token = "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.actions.viewToken({
  token,
});
```

### Parameters

#### token

- **Type:** `string`

CAIP-19 asset ID

For example, Base USDC: eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

### Return Value

`void`

## quickAuth.fetch

Make a [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) request
with `Authorization` header set to `Bearer ${token}` where token is a
Quick Auth session token.

:::note
This is a convenience function that makes it easy to make authenticated
requests but using it is not a requirement. Use
[getToken](/docs/sdk/quick-auth/get-token) to get a token directly and attach
it to requests using the library and format of your choosing.
:::

### Usage

```ts twoslash
const url = "https://example.com";

// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

await sdk.quickAuth.fetch(url);
```

See the [make authenticated requests example](/docs/sdk/quick-auth#make-authenticated-requests).

### Parameters

See [Fetch parameters](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#parameters).

### Return Value

See [Fetch return value](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#return_value).

import { Caption } from '../../../../components/Caption.tsx';

## quickAuth.getToken

Request a signed JWT from a [Farcaster Quick Auth
Server](https://github.com/farcasterxyz/protocol/discussions/231).

### Usage

```ts twoslash
// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

const { token } = await sdk.quickAuth.getToken();
```

See the [session token example](/docs/sdk/quick-auth#use-a-session-token-directly).

### Parameters

#### force

- **Type:** `boolean`

Acquire a new token even if one is already in memory and not expired.

#### quickAuthServerOrigin (optional)

- **Type:** `string`

Use a custom Quick Auth Server. Defaults to `https://auth.farcaster.xyz`.

### Return Value

A [JWT](https://datatracker.ietf.org/doc/html/rfc7519) issued by the Quick Auth
Server based on the Sign In with Farcaster credential signed by the user.

```ts
{
  token: string;
}
```

You must [validate the token on your server](/docs/sdk/quick-auth#validate-a-session-token).

#### JWT Payload

```json
{
  "iat": 1747764819,
  "iss": "https://auth.farcaster.xyz",
  "exp": 1747768419,
  "sub": 6841,
  "aud": "miniapps.farcaster.xyz"
}
```

##### sub

- **Type:** `number`

The FID of the signed in user.

##### iss

- **Type:** `string`

The Quick Auth server that verified the SIWF credential and issued the JWT.

##### aud

- **Type:** `string`

The domain this token was issued to.

##### exp

- **Type:** `number`

The JWT expiration time.

##### iat

- **Type:** `number`

The JWT issued at time.

## Quick Auth

Quick Auth is a lightweight service built on top of Sign In with Farcaster that makes
it easy to get an authenticated session for a Farcaster user.

### Examples

- [Make authenticated requests](#make-authenticated-requests)
- [Use a session token directly](#use-a-session-token-directly)
- [Validate a session token](#validate-a-session-token)

#### Make authenticated requests

In your frontend, use [`sdk.quickAuth.fetch`](/docs/sdk/quick-auth/fetch) to
make an authenticated request. This will automatically get a Quick Auth session
token if one is not already present and add it as Bearer token in the
`Authorization` header:

```tsx twoslash
const BACKEND_ORIGIN = "https://hono-backend.miniapps.farcaster.xyz";

// ---cut---
import React, { useState, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export function App() {
  const [user, setUser] = useState<{ fid: number }>();

  useEffect(() => {
    (async () => {
      const res = await sdk.quickAuth.fetch(`${BACKEND_ORIGIN}/me`);
      if (res.ok) {
        setUser(await res.json());
        sdk.actions.ready();
      }
    })();
  }, []);

  // The splash screen will be shown, don't worry about rendering yet.
  if (!user) {
    return null;
  }

  return <div>hello, {user.fid}</div>;
}
```

The token must be [validated on your server](#validate-a-session-token).

#### Use a session token directly

In your frontend, use
[`sdk.quickAuth.getToken`](/docs/sdk/quick-auth/get-token) to get a Quick Auth
session token. If there is already a session token in memory that hasn't
expired it will be immediately returned, otherwise a fresh one will be
acquired.

```html
<div id="user" />

<script type="module">
  import ky from "https://esm.sh/ky";
  import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

  const { token } = await sdk.quickAuth.getToken();
  const user = await ky
    .get("http://localhost:8787" + "/me", {
      headers: { Authorization: "Bearer " + token },
    })
    .json();
  document.getElementById("user").textContent = JSON.stringify(user);
</script>
```

The token must be [validated on your server](#validate-a-session-token).

#### Validate a session token

First, install the Quick Auth library into your backend with:

```
npm install @farcaster/quick-auth
```

Then you can use `verifyJwt` to check the JWT and get back the token payload
which has the FID of the user as the `sub` property.

You can then look up additional information about the user.

```ts
import { Errors, createClient } from "@farcaster/quick-auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const client = createClient();
const app = new Hono<{ Bindings: Cloudflare.Env }>();

// Resolve information about the authenticated Farcaster user. In practice
// you might get this information from your database, Neynar, or Snapchain.
async function resolveUser(fid: number) {
  const primaryAddress = await (async () => {
    const res = await fetch(
      `https://api.farcaster.xyz/fc/primary-address?fid=${fid}&protocol=ethereum`
    );
    if (res.ok) {
      const { result } = await res.json<{
        result: {
          address: {
            fid: number;
            protocol: "ethereum" | "solana";
            address: string;
          };
        };
      }>();

      return result.address.address;
    }
  })();

  return {
    fid,
    primaryAddress,
  };
}

const quickAuthMiddleware = createMiddleware<{
  Bindings: Cloudflare.Env;
  Variables: {
    user: {
      fid: number;
      primaryAddress?: string;
    };
  };
}>(async (c, next) => {
  const authorization = c.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Missing token" });
  }

  try {
    const payload = await client.verifyJwt({
      token: authorization.split(" ")[1] as string,
      domain: c.env.HOSTNAME,
    });

    const user = await resolveUser(payload.sub);
    c.set("user", user);
  } catch (e) {
    if (e instanceof Errors.InvalidTokenError) {
      console.info("Invalid token:", e.message);
      throw new HTTPException(401, { message: "Invalid token" });
    }

    throw e;
  }

  await next();
});

app.use(cors());

app.get("/me", quickAuthMiddleware, (c) => {
  return c.json(c.get("user"));
});

export default app;
```

### Optimizing performance

To optimize performance, provide a `preconnect` hint to the browser in your
frontend so that it can preemptively initiate a connection with the Quick Auth
Server:

```html
<link rel="preconnect" href="https://auth.farcaster.xyz" />
```

Or if you're using React:

```ts
import { preconnect } from "react-dom";

function AppRoot() {
  preconnect("https://auth.farcaster.xyz");
}
```

### Quick Auth vs Sign In with Farcaster

[Sign In with
Farcaster](https://github.com/farcasterxyz/protocol/discussions/110) is the
foundational standard that allows Farcaster users to authenticate into
applications.

[Farcaster Quick
Server](https://github.com/farcasterxyz/protocol/discussions/231) is an
optional service built on top of SIWF that is highly performant and easy to
integrate. Developers don't need to worry about securely generating and
consuming nonces or the nuances of verifying a SIWF message—instead they
receive a signed JWT that can be used as a session token to authenticate their
server.

The Auth Server offers exceptional performance in two ways:

- the service is deployed on the edge so nonce generation and verification
  happens close to your users no matter where they are located
- the issued tokens are asymmetrically signed so they can be verified locally
  on your server

### Functions

| Name                                       | Description                         |
| ------------------------------------------ | ----------------------------------- |
| [getToken](/docs/sdk/quick-auth/get-token) | Gets a signed Quick Auth token      |
| [fetch](/docs/sdk/quick-auth/fetch)        | Make an authenticated fetch request |

### Properties

| Name                                | Description                        |
| ----------------------------------- | ---------------------------------- |
| [token](/docs/sdk/quick-auth/token) | Returns an active token if present |

## quickAuth.token

Returns an active Quick Auth session token when present.

:::note
It's generally preferable to use [getToken](/docs/sdk/quick-auth/get-token)
since this will always return a fresh token, however, this property is provided
for situations where a synchronous API is useful.
:::

### Usage

```ts twoslash
// ---cut---
import { sdk } from "@farcaster/miniapp-sdk";

// will be undefined
console.log(sdk.quickAuth.token);

await sdk.quickAuth.getToken();

// will return the active token acquired above
console.log(sdk.quickAuth.token);
```

You must [validate the token on your server](/docs/sdk/quick-auth#validate-a-session-token).
