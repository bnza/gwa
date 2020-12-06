# gwa

Geoserver web application (client)

GWA is a simple easy to use web application which aims to provide a straightforward way to display and interact with [Geoserver](http://geoserver.org/) geospatial data and metadata.
GWA is built atop [OpenLayers](https://openlayers.org/) and [Vue](https://vuejs.org/) using [Vuetify](https://vuetifyjs.com/en/) and [Vuelayers](https://vuelayers.github.io/#/) as components libraries.

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

Projects' configuration uses a JSON config file ```config.json``` put in the public directory root to retrieve required information such server URL, data projection, layer typenames and so on.

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
        "stroke": {
          "color": "BBBBBB",
          "width": 9
        },
        "fill": {
          "color": "AAAAAA"
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
          "name": "tiger:poi"
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

### Geoserver

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


