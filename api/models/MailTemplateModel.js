'use strict'
import ejs from 'ejs'
import { CustomError } from "../helpers"
import MailTemplate from "../schemas/_MailTemplate"

const MailTemplateModel = {
  createTemplate,
  getTemplate,
  renderTemplate
}

export default MailTemplateModel

async function createTemplate (body) {
  try {
    const createTemplate = new MailTemplate(body)
    await createTemplate.save()
    return
  } catch (error) {
    throw new CustomError(error)
  }
}

async function getTemplate (body) {
  try {
    const getTemplate = await MailTemplate.findOne(body)
    return getTemplate
  } catch (error) {
    throw new CustomError(error)
  }
}

async function renderTemplate (body) {
  try {
    const { locals, templateBody } = body
    const template = await MailTemplate.findOne(templateBody)
    const { html } = template
    return ejs.render(html, locals)
  } catch (error) {
    throw new CustomError(error)
  }
}
