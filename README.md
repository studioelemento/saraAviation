# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Staff access and SEO publishing

The dashboard shows a password-only form. It signs in to Supabase using the staff account email configured in `VITE_ADMIN_EMAIL`. News, Courses, Gallery, Team, Jobs, leads and analytics use the same Supabase project as the public site.

1. For an existing database with the content, leads and analytics tables, run [staff_seo.sql](supabase/staff_seo.sql) in Supabase SQL Editor. For a new database, first run [leads.sql](supabase/leads.sql), [content.sql](supabase/content.sql), and [analytics_all.sql](supabase/analytics_all.sql), in that order. The staff migration removes the old anonymous management policies.
2. Create the dashboard account in Supabase Authentication with a dedicated email and password. Grant dashboard access to the account using its user UUID in the SQL Editor:

   ```sql
   insert into public.site_admins (user_id)
   values ('<staff user UUID>')
   on conflict do nothing;
   ```

   Remove the corresponding row from this table to revoke dashboard access. Set `VITE_ADMIN_EMAIL` to the account email in Vercel and in `.env.local` for local development. This build setting is visible in browser code. Manage the password in Supabase Authentication.
3. In Vercel, set the project root to the folder containing this package and use `npm run build`. Configure `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_SITE_URL` for Production. Create a [Deploy Hook](https://vercel.com/docs/deploy-hooks) for the production branch and add its URL as the server-only `SEO_DEPLOY_HOOK_URL`. Set `SEO_FETCH_PUBLISHED=true` and deploy the updated code.
4. Enter the Supabase account password at `/admin/login`, open **SEO**, and publish a change. A successful request queues a Vercel build. After deployment, view the public page source to check its title, description, and share image. Blank fields use the built-in page defaults.

A local build uses built-in SEO settings unless `SEO_FETCH_PUBLISHED=true` is exported in the process environment. The regular Vite development server does not run the Vercel publish function.

For local UI testing, set `VITE_LOCAL_ADMIN_PASSWORD` in `.env.local` and restart `npm run dev`. Open `/admin/login` on localhost. This opens the dashboard without a Supabase staff session. Testing staff-only database access still requires the configured Supabase account, and SEO deployment requires Vercel.

## Courses and News editorial workflow

Apply [content_workflow.sql](supabase/content_workflow.sql) after [staff_seo.sql](supabase/staff_seo.sql). The existing staff account can edit, preview, publish, unpublish, and load older versions into the editor. Use **Save draft** to keep changes private to the editor and **Publish** to replace the live version. History records timestamps and publishing actions. Staff using the same account share that history. Local test sign-in supports saving and previewing browser-local drafts.

News posts have their own URLs and SEO fields. Reapply `content_workflow.sql` to add the fields to an existing database. With Vercel SEO publishing configured, publishing or unpublishing a news post requests a build to update article metadata and sitemap entries.
