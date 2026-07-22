# Portfolio — Francis Maxuel Urquizo Oré

[Versión en español](README.md)

A modern, responsive personal portfolio for presenting projects, experience, skills, certifications, awards, and articles. The interface is built with React, while dynamic content is retrieved from Supabase.

![Portfolio preview](public/assets/img/proyects/portafolio.jpg)

## Features

- Home page covering profile, projects, experience, skills, achievements, and contact details.
- Dedicated project and experience detail pages.
- Markdown blog with GitHub Flavored Markdown support.
- Filtering, interactive cards, a custom cursor, and GSAP page transitions.
- Availability status calculated in the Lima time zone.
- Supabase-backed content with session caching to reduce repeated queries.
- Responsive design using Tailwind CSS 4 and custom styles.
- Automated deployment to GitHub Pages.

## Tech stack

- React 19 and React Router 7
- Vite 6
- Tailwind CSS 4
- Supabase
- GSAP
- Lucide React
- React Markdown and Remark GFM
- ESLint 9

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project containing the portfolio data

## Installation

```bash
git clone https://github.com/UmbraFlare-code/Portafolio.git
cd Portafolio
npm install
```

Copy the example environment file and add your public Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

> Variables prefixed with `VITE_` are included in the client bundle. Use only the Supabase publishable key and protect your data with Row Level Security (RLS).

Start the development server:

```bash
npm run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build in `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint across the project. |

## Project structure

```text
Portafolio/
├── public/               # Images, icons, and fonts
├── src/
│   ├── components/       # Reusable components
│   ├── data/             # Local profile configuration
│   ├── layouts/          # Main layouts
│   ├── lib/              # Supabase client
│   ├── pages/            # Pages and detail routes
│   ├── sections/         # Home-page sections
│   ├── services/         # Queries, adapters, and data cache
│   └── styles/           # Global styles
├── .github/workflows/    # Deployment and Supabase maintenance
└── vite.config.js
```

## Deployment

The GitHub Pages workflow runs when changes are pushed to the `workflow-web` branch. Configure these GitHub secrets before deploying:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Vite uses `/Portafolio/` as its base path. If you publish under a different repository name or domain, update `base` in `vite.config.js`.

## License

Distributed under the MIT License. See [LICENSE](LICENSE).

## Contact

- [LinkedIn](https://linkedin.com/in/maxuel-urquizo-or%C3%A9-2ba4b1279)
- [GitHub](https://github.com/UmbraFlare-code)
- [Portfolio](https://umbraflare-code.github.io/Portafolio/)
- [Resume](https://rxresu.me/umbraflare-code/cv)
- Email: umaxuel@gmail.com
