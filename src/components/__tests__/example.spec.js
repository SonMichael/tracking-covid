/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer'
import HomeScreen from "../../modules/home/HomeView"
import _ from 'lodash'
jest.useFakeTimers()
describe('getIso', () => {
})
it('response is array', async () => {
  const dataCountries = [
    {
      "Country": "Guyana",
      "Slug": "guyana",
      "ISO2": "GY"
    },
    {
      "Country": "Tanzania, United Republic of",
      "Slug": "tanzania",
      "ISO2": "TZ"
    }]
  const dataPremiumSummary = {Countries: [{
    "CountryISO": "TZ",
    "Country": "Tanzania",
    "Continent": "Africa",
    "Date": "2020-09-13T00:00:00Z",
    "TotalCases": 509,
    "NewCases": 0,
    "TotalDeaths": 21,
    "NewDeaths": 0,
    "TotalCasesPerMillion": 8.521,
    "NewCasesPerMillion": 0,
    "TotalDeathsPerMillion": 0.352,
    "NewDeathsPerMillion": 0,
    "StringencyIndex": 0,
    "DailyIncidenceConfirmedCases": 0,
    "DailyIncidenceConfirmedDeaths": 0,
    "DailyIncidenceConfirmedCasesPerMillion": 0,
    "DailyIncidenceConfirmedDeathsPerMillion": 0,
    "IncidenceRiskConfirmedPerHundredThousand": 0.8521000000000001,
    "IncidenceRiskDeathsPerHundredThousand": 0.035199999999999995,
    "IncidenceRiskNewConfirmedPerHundredThousand": 0,
    "IncidenceRiskNewDeathsPerHundredThousand": 0,
    "CaseFatalityRatio": 4.12573673870334
  }, {
    "CountryISO": "GY",
    "Country": "Guyana",
    "Continent": "South America",
    "Date": "2020-09-13T00:00:00Z",
    "TotalCases": 1812,
    "NewCases": 49,
    "TotalDeaths": 54,
    "NewDeaths": 2,
    "TotalCasesPerMillion": 2303.705,
    "NewCasesPerMillion": 62.297,
    "TotalDeathsPerMillion": 68.653,
    "NewDeathsPerMillion": 2.543,
    "StringencyIndex": 0,
    "DailyIncidenceConfirmedCases": 56.57142857142857,
    "DailyIncidenceConfirmedDeaths": 1.4285714285714286,
    "DailyIncidenceConfirmedCasesPerMillion": 71.92257142857144,
    "DailyIncidenceConfirmedDeathsPerMillion": 1.8161428571428573,
    "IncidenceRiskConfirmedPerHundredThousand": 230.3705,
    "IncidenceRiskDeathsPerHundredThousand": 6.8653,
    "IncidenceRiskNewConfirmedPerHundredThousand": 6.229699999999999,
    "IncidenceRiskNewDeathsPerHundredThousand": 0.2543,
    "CaseFatalityRatio": 2.980132450331126
  }]}
  const mockGetPremiumSummary = jest.fn()
  const mockGetCountries = jest.fn()
  mockGetPremiumSummary.mockResolvedValueOnce(dataPremiumSummary)
  mockGetCountries.mockResolvedValueOnce(dataCountries)
  const component = await renderer.create(<HomeScreen getCountries={mockGetCountries} getPremiumSummary={mockGetPremiumSummary} />)
  const instance = component.getInstance()
  const responseDataCheck = instance.getDataSearch('Tanzania')
  expect(responseDataCheck[0].CountryISO).toMatch('TZ')
})
