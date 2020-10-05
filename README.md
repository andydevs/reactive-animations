Reactive Animations
===========================================================

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

    $ npm start