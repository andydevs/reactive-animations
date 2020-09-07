Reactive Animations
===========================================================

[![Netlify Status](https://api.netlify.com/api/v1/badges/b38ce71e-9d91-4cae-ad51-7384898f87cd/deploy-status)](https://app.netlify.com/sites/reactive-animations/deploys)

Experiments in using RxJS to reactively animate objects

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

    $ npm run serve