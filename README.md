# gwa

Geoserver web application (client)

GWA is a simple easy to use web application which aims to provide a straightforward way to display and interact with [Geoserver](http://geoserver.org/) geospatial data and metadata.
GWA is built atop [OpenLayers](https://openlayers.org/) and [Vue](https://vuejs.org/) using [Vuetify](https://vuetifyjs.com/en/) and [Vuelayers](https://vuelayers.github.io/#/) as components libraries.


- [Installation](#installation)
- [Project Config](#config)
    - [View](#view)
    - [Servers](#servers)
    - [Layers](#layers)
    - [Group Layers](#grouplayers)
    - [Base Maps](#basemaps)
    - [Example](#full-valid-config-example)
3. [Geoserver Config](#geoserver)

## Installation
 
```
cd /your/webServer/documentRoot
sudo git clone https://github.com/bnza/gwa.git projectName
sudo chown -R :www-data projectName
cd projectName
yarn install
yarn run build
```

The simplest way to serve the project is to set up your web server pointing to ```/your/webServer/documentRoot/projectName/dist``` 

## Config

GWA uses a JSON config file `config.json` to retrieve required information such server URL, data projection, layer typenames and so on.
The file is located inside the `config` folder and will be automatically copied in the web public directory after the build process.
GWA uses [Joi](https://joi.dev/), which adheres strictly to JSON specification, as data validator, we suggest you to use a suitable text editor with syntax highlight capabilities. 

Config file must reside inside the ```config``` directory. In order to publish changes you should run

```
yarn run config
```

The config file contains a valid JSON object with the following key:

### title
A short and descriptive name of your project. It will be displayed in the application bar and in the browser title tab.

- **Required**

### description

A short sentence which describes your project containing some qualifying keywords.

- *Optional*

### dataProjection

Projection of input/output plain coordinates in properties, events and etc. See [Global data projection](https://vuelayers.github.io/#/quickstart?id=global-data-projection) in Vuelayers documentation

- *Optional*
- *Default* `EPSG:3857`

### projections

A list of projection (see [below](#projection)) used in the project. Except for the most used ones (e.g. `EPSG:3857` or `EPSG:4326`) Open Layers requires to [register](https://openlayers.org/en/latest/doc/faq.html#how-do-i-change-the-projection-of-my-map-) the projections which will be used.

- *Type:* `array`
- *Optional*

#### projection

An object containing the projection code and his [proj4](https://proj.org/) definition. Proj4 definition could be found at [epsg.io](http://epsg.io) 

```json
{
  "code": "EPSG:26714",
  "def": "+proj=utm +zone=14 +datum=NAD27 +units=m +no_defs "
}
```

### view

An object containing the initial configuration of the 2D representation of the map. 

- *Optional*

Valid keys are a subset of [vl-view](https://vuelayers.github.io/#/docs/component/view?id=vl-view) Vuelayers component's properties 

#### center

The center coordinate of the map view in the provided projection

- *Type:* `number[]`
- *Default:* `[0,0]`
 
#### zoom

- *Type:* `number`
- *Default:* `0`

#### projection 

- *Type:* `string`
- *Default:* `EPSG:3857`

#### extent 

The extent that constrains the center defined in the view projection, in other words, center cannot be set outside this extent.

- *Optional*
- *Type:* `number[leftBottomX, leftBottomY, rightTopX, rightTopY]`
- *Default:* `undefined`

### servers

A list of Geoserver's servers. MUST contain at least one server

- **Required**
- *Type:* `server[]`


#### server

An object containing the Geoserver server configuration data.

##### name

The server identifier. MUST be unique 

- *Optional*
- *Type:* `string`
- *Default:* `default`

#### baseUrl

The fully qualified Geoserver' base URL 


```json
"servers": [
    {
      "baseUrl": "http://localhost:8585/geoserver"
    },
    {
      "name": "wrong",
      "baseUrl": "http://localhost:8586/geoserver"
    }
  ],
```

### layers

An array of valid layers object. This group of layers will be shown as "root" layers (they won't belong to any layer group)

- *Optional*
- *Type*: `layer[]`

#### layer

An object containing the following keys

#### type
The layer's service type. Valid values are: `wfs`, `wms`, `wmts` which refers to the supported services names

- **Required**
- *Type*: `string`

#### name

The [layer](https://docs.geoserver.org/stable/en/user/data/webadmin/layers.html) name prepended by the [workspace](https://docs.geoserver.org/stable/en/user/data/webadmin/workspaces.html) identifier separated by a comma e.g. `topp:state`

- **Required**
- *Type*: `string`

#### label

The displayed layer label. When not set default to the `name` property value

- *Optional*
- *Type:* `string`
- *Default:* `name` property value


```json
    {
      "type": "wms",
      "name": "nurc:mosaic"
    }
```
`wfs` layers, which represent vector data, own a further `style` property

#### style

#### symbology

An object which contains display style for the vector data.

```json
    "style": {
      "symbology": {
          "stroke": {
            "color": "FF8C00",
            "width": 3
          },
          "fill": {
            "color": "FF8C00",
            "opacity": 0.4
          },
          "image": {
            "radius": 4,
            "points": 4,
            "rotation": -45
          } 
      }
    }
```

Valid keys are:


#### stroke 

Stroke display style. Valid keys are:

#### color

Hexadecimal string value without `#`

- *Optional*
- *Type:* `string`
- *Default:* `3399CC`

#### width

Width of the stroke in pixels

- *Optional*
- *Type:* `number`
- *Default:* `1.25`

```json
{
  "color": "AF5733",
  "width": 3
}
```

#### fill

Color of the point/polygon filling. Valid keys are:

#### color (see [above](#color))

#### opacity

Fill color opacity. Valid values are number between 0 and 1 

- *Optional*
- *Type:* `number`
- *Default:* `0.4`

```json
{
  "color": "BB33FF",
  "opacity": 0.4
}
```

#### image

The image key is used to represent points symbols. Circles required just the radius property to be set
**Be careful! Image property MUST be used only with Point/MultiPoint geometries**

#### radius

- *Optional*
- *Type:* `number`
- *Default:* `3`

#### circle style config example (with default fill/stroke)
```json
"style": {
  "image": {
    "radius": 4
  }
}
```

In order to display regular shapes you must provide at least the number of vertices using the `points` property

#### points

- *Optional*
- *Type:* `number`
- *Default:* `4`


#### regular shape style config example (with custom fill/stroke)
**Be careful! Image property MUST be used only with Point/MultiPoint geometries**
```json
"symbology": {
  "stroke": {
    "color": "AF5733",
    "width": 3
  },
  "fill": {
    "color": "BB33FF",
    "opacity": 0.4
  },
  "image": {
    "radius": 4,
    "points": 4
  }
}
```

### groupLayers

An array of group layer object

#### groupLayer

An object containing the following keys

#### name

The group layer name. Must be unique

- **Required**
- *Type*: `string`

#### label

The displayed group layer label

- *Optional*
- *Type:* `string`
- *Default:* `name` property value

#### layers

An array of valid [layer objects](#layer)

- **Required**
- *Type*: `layer[]`

### baseMaps

An object containing the following keys:

#### active

The active basemap layer. Valid values are: `osm` and `bing`

- *Optional*
- *Type:* `string`
- *Default:* `osm`

#### osm

Defines the [Open Street Map](https://www.openstreetmap.org/) base map layer presence in the project

- *Optional*
- *Type:* `boolean`
- *Default:* `true`

#### bing

[Bing Maps](https://www.microsoft.com/en-us/maps) configuration data. An object containing the following keys:


#### apiKey

Bing API key

- **Required**
- *Type*: `string`

#### culture

Bing API [culture](https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/culture-parameter) parameter
- *Optional*
- *Type:* `string`
- *Default:* `en-US`


### Full valid config example

```json
{
  "title": "gwaTitle",
  "description": "The test client",
  "dataProjection": "EPSG:26714",
  "projections": [
    {
      "code": "EPSG:26714",
      "def": "+proj=utm +zone=14 +datum=NAD27 +units=m +no_defs "
    }
  ],
  "view": {
    "center": [-11560592.76, 5526675.11],
    "zoom": 10
  },
  "servers": [
    {
      "baseUrl": "http://localhost:8585/geoserver"
    },
    {
      "name": "wrong",
      "baseUrl": "http://localhost:8586/geoserver"
    }
  ],
  "layers": [
    {
      "type": "wmts",
      "name": "sf:sfdem"
    },
    {
      "type": "wfs",
      "name": "topp:states",
      "style": {
        "symbology": {
          "stroke": {
            "color": "BBBBBB",
            "width": 9
          },
          "fill": {
            "color": "AAAAAA"
          }
        }
      }
    },
    {
      "type": "wfs",
      "name": "topp:tasmania_cities"
    },
    {
      "type": "wms",
      "name": "nurc:mosaic"
    }
  ],
  "groupLayers": [
    {
      "name": "manhattan",
      "label": "Manhattan",
      "layers": [
        {
          "type": "wfs",
          "name": "tiger:poi",
          "style": {
            "symbology": {
              "stroke": {
                "color": "AF5733",
                "width": 3
              },
              "fill": {
                "color": "BB33FF",
                "opacity": 0.4
              },
              "image": {
                "radius": 4,
                "points": 4
              }
            }
          }
        },
        {
          "type": "wfs",
          "name": "tiger:tiger_roads"
        }
      ]
    }
  ],
  "baseMaps": {
    "active": "bing",
    "osm": true,
    "bing": {
      "apiKey": "your-api-key-here",
      "culture": "it-it"
    }
  }
}
```

## Geoserver

If your application URL is outside your server domain, in order to avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) related security errors you must set up your server accordingly:

#### Enable Geoserver CORS

As stated [here](https://docs.geoserver.org/latest/en/user/production/container.html#enable-cors) in Geoserver documentation you can enable CORS just uncommenting the following ```<filter>``` and ```<filter-mapping>``` from ```webapps/geoserver/WEB-INF/web.xml``` in your ```GEOSERVER_HOME```

#### Use reverse proxy in your web server

Following is a Apache2 virtual host configuration with reverse [proxy](https://httpd.apache.org/docs/2.4/mod/mod_proxy.html) 

```xml
<VirtualHost *:80> 
    <!-- Your configuration here -->
    <Location /geoserver>
            ProxyPass "http://localhost:8080/geoserver"
            ProxyPassReverse "http://localhost:8080/geoserver"
    </Location>
    ProxyPreserveHost On
</VirtualHost>
```


