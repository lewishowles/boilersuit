# Boilersuit

Boilersuit is a command-line tool, built using Gluegun, to quickly get a new project based on the [`boilerplate`](https://github.com/lewishowles/boilerplate) template to a point where you can get to the fun stuff as quickly as possible—actually building it.

## First use

On first use, I recommend adding an alias via Bun (or pnpm, yarn, npm, or your preference) so that it's available from anywhere.

```
cd /path/to/boilersuit
bunx link
```

You should then be able to use the `boilersuit` command from anywhere.

## Creating a new project

Creating a new project is as simple as using the `boilersuit` command and answering the questions provided. The order of operations is in essence the following:

- Create a new project folder based on the `Package name` response.
- Download the `boilerplate` repo.
- Replace a number of placeholders in the project, based on the answers provided.
- Install packages via `bun i`
- Initialise Git and perform an initial commit to ensure the starting point is clean.

Your output will look something like this.

```

  _           _ _                     _ _
 | |         (_) |                   (_) |
 | |__   ___  _| | ___ _ __ ___ _   _ _| |_
 | '_ \ / _ \| | |/ _ \ '__/ __| | | | | __|
 | |_) | (_) | | |  __/ |  \__ \ |_| | | |_
 |_.__/ \___/|_|_|\___|_|  |___/\__,_|_|\__|


Package name
This is used to create the project directory, and as the package name in package.json,
so should follow the appropriate format.

✔ Package name · form-builder

Site title
The site title is used for the <title> tag, as well as various other locations.

✔ Site title · Form builder

Site description
The description is used in both the meta and package description fields.

✔ Site description · A simple tool to help quickly build consistent forms using @lewishowles/components

Site URL
The site URL is used in the og:url meta tag.

✔ Site URL · https://lewishowles.github.io/form-builder/

Theme colour
The theme colour is used for the mask-image favicon, as well as the manifest file.

✔ Theme colour · #a3004c

Base URL
The base URL is used for Vite and is necessary if the site is not hosted at the root of its domain.
For example, the base URL for https://lewishowles.github.io/components/ would be /components/

✔ Base URL · /form-builder/

Downloading boilerplate repository…

Cloning into '.'...
remote: Enumerating objects: 61, done.
remote: Counting objects: 100% (61/61), done.
remote: Compressing objects: 100% (48/48), done.
remote: Total 61 (delta 8), reused 61 (delta 8), pack-reused 0 (from 0)
Receiving objects: 100% (61/61), 848.32 KiB | 5.85 MiB/s, done.
Resolving deltas: 100% (8/8), done.

✔︎ Repository downloaded successfully.

✔︎ Placeholders replaced successfully.

Initialising git…

✔︎ Git initialised.

----------------------------------------------------------------------------------------------------------------------------
! Before installing packages, make sure to add your `.npmrc` file with the necessary credentials for private repositories. !
----------------------------------------------------------------------------------------------------------------------------

Installing packages
To install packages, run:

cd form-builder
bun i

Initialising simple-git-hooks
To initialise simple-git-hooks after package installation, run:

bunx simple-git-hooks
```
