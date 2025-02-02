# Boilersuit

Boilersuit is a CLI built using Gluegun to help getting started with a project that will be based on the [`boilerplate`](https://github.com/lewishowles/boilerplate) template.

## First use

On first use of Boilersuit, I recommend adding an alias so that it's available from anywhere.

```
cd /path/to/boilersuit
bunx link
```

You can then use the `boilersuit` command from anywhere.

## Creating a new project

Creating a new project is as simple as using the `boilersuit` command and answering the questions provided. Your output will look something like this.

```

  _           _ _                     _ _
 | |         (_) |                   (_) |
 | |__   ___  _| | ___ _ __ ___ _   _ _| |_
 | '_ \ / _ \| | |/ _ \ '__/ __| | | | | __|
 | |_) | (_) | | |  __/ |  \__ \ |_| | | |_
 |_.__/ \___/|_|_|\___|_|  |___/\__,_|_|\__|


Package name
This is used as the package name in package.json, so should follow the appropriate format.

✔ Package name · form-builder

Site title
The site title is used for the <title> tag, as well as various other locations.

✔ Site title · Form builder

Site description
The description is used in both the meta and package description fields.

✔ Site description · A handy tool to help create forms using @lewishowles/components.

Site URL
The site URL is used in the og:url meta tag.

✔ Site URL · https://lewishowles.github.io/form-builder/

Theme colour
The theme colour is used for the mask-image favicon, as well as the manifest file.

✔ Theme colour · #a3004c

Base URL
The base URL is used for Vite and is necessary if the site is not hosted at the root of its domain.
For example, the base URL for https://lewishowles.github.io/components would be components

✔ Base URL · /form-builder/

…

✔︎ `boilerplate` downloaded successfully
✔︎ Placeholders replaced successfully.
```
