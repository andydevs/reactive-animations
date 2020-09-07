Web Template
===========================================================

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/andydevs/web-boilerplate)

Use this template for building single page web applications.

On the repository webpage, you can either click 
`Use this Template` which will create a new repository with
the template code, or you can click the "Deploy to Netlify" button in
the README, which will both create a new repository and
deploy a new website to Netlify.

**[DELETE THE NETLIFY BUTTON AND EDIT THIS PART WITH THE DESCRIPTION OF YOUR SITE]**

Development
-----------------------------------------------------------

### Application Architecture

_Technologies_

| Part          |  System |
|:--------------|--------:|
| Bundling      | Webpack |
| Stylesheets   |    SCSS |
| Transpilation |   Babel |

_Folder Structure_

| Folder       |                             Use |
|:-------------|--------------------------------:|
| `app`        |                Application Code |
| `app/style`  |                SCSS Stylesheets |
| `app/assets` |      Static Assets for the Site |
| `public`     | Build Output Directory for Site |

### Building and Running

To build the app, run

    $ npx webpack

Or

    $ npm run build

The boilerplate also provides a development server which
could be run with

    $ npx webpack-dev-server

Or

    $ npm serve