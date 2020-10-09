/// <reference types="Cypress" />

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.server()
    cy.fixture('config/integration/simple.json').as('configJSON')
    cy.fixture('geoserver/wfs/GetCapabilities/v100.xml').as('wfsGetCapabilitiesXML')
    cy.fixture('geoserver/wfs/DescribeFeatureType/topp_states.json').as('DescribeFeatureTypeJSON')
    cy.fixture('geoserver/wfs/GetFeature/topp_states.json').as('GetFeatureJSON')
    cy.route('**/wfs?request=GetCapabilities', '@wfsGetCapabilitiesXML')
    cy.route(/DescribeFeatureType/, '@DescribeFeatureTypeJSON')
    cy.route('config.json', '@configJSON')
    cy.route({
      method: 'POST',
      url: new RegExp('geoserver/wfs'),
      body: new RegExp('^<GetFeature'),
      response: '@GetFeatureJSON'
    })
    cy.visit('/')
    cy.contains('div', 'test1Title')
  })
})
