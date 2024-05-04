import fetch from 'node-fetch'

import { CustomError } from '.'
import _CompanyList from '../schemas/_CompanyList'
import _UniversityList from '../schemas/_UniversityList'

const { CLEARBIT_API_KEY } = process.env
// const universities = require('./world_universities_and_domains.json')
const cities = require('./cities_list.json')
const designations = require('./designation_list.json')

const DEFAULT_COMPANY_LOGO =
  'https://firebasestorage.googleapis.com/v0/b/simpliclarify-user-portal.appspot.com/o/Company%2Fdefault_company_logo.png?alt=media&token=acdaffed-262a-4f3c-ad46-89b15b98f03b'

export async function getCompanyLogo(companyName) {
  try {
    const company = await _CompanyList.findOne({ companyName })
    if (company) {
      return company.companyLogo
    }
    let res = await fetch(
      `https://company.clearbit.com/v1/domains/find?name=${companyName}}`,
      {
        headers: {
          Authorization: `Bearer ${CLEARBIT_API_KEY}`
        }
      }
    )
    res = await res.json()
    const newCompany = new _CompanyList({
      companyName
    })
    if (res.error) {
      newCompany.companyDomain = 'Unknown'
      newCompany.companyLogo = DEFAULT_COMPANY_LOGO
    } else {
      newCompany.companyDomain = res.domain
      if (res.logo == null) {
        newCompany.companyLogo = DEFAULT_COMPANY_LOGO
      } else {
        newCompany.companyLogo = res.logo
      }
    }
    await newCompany.save()
    return newCompany.companyLogo
  } catch (e) {
    throw new CustomError(e)
  }
}

export async function getLogoFromDomain(domainName) {
  return `https://logo.clearbit.com/${domainName}`
}

export async function getUniversityLogo(universityName) {
  try {
    const university = await _UniversityList.find({ name: universityName })
      .select("domains -_id")
      .lean();
    if (university.length === 0) {
      throw new CustomError(`${universityName} does not exist in our DB`)
    }
    return getLogoFromDomain(university[0].domains[0])
  } catch (e) {
    throw new CustomError(e)
  }
}

export async function getUniversitiesInCountry(countryCode) {
  try {
    const res = (
      await _UniversityList.find({ alphaTwoCode: countryCode })
        .select('name -_id')
        .lean()
    ).map((univ) => univ.name)

    return res
  } catch (err) {
    throw new CustomError(err)
  }
}

export async function getCitiesInCountry(countryCode) {
  let requiredCities = []
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].iso === countryCode) {
      requiredCities = cities[i].cities
      break
    }
  }
  return requiredCities
}

export async function getDesignation() {
  return designations
}

// TESTING
// async function testing() {
//     let res = await getCompanyLogo('tata motors')
//     res = await getCompanyLogo('tata motors random')
//     res = getLogoFromDomain('harvard.edu')
//     res = getUniversitiesInCountry('US')
// }

// testing()
