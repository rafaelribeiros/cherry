import { Values } from '../constants/values'
import { verifyResponse } from '../config/utils'

function getRandomColor(nameToColor) {
  const name = nameToColor || 'usuario'
  const colors = [
    '#ef5350',
    '#ec407a',
    '#ab47bc',
    '#bdbdbd',
    '#5c6bc0',
    '#42a5f5',
    '#8d6e63',
    '#26a69a',
    '#66bb6a',
    '#ffa726',
    '#ff7043',
    '#78909c'
  ]
  // Generate color for the same user.
  // Compute hash code
  let hash = 7
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash < 5) - hash)
  }
  const index = Math.abs(hash % colors.length)
  return colors[index]
}

const clearUndefined = (array) => {
  if (array) {
    const clearArray = array.filter(initial => (
      initial !== '' && typeof initial !== 'undefined'
    ))
    return clearArray
  }
  return array
}

export function getNameInitials(name) {
  if (name) {
    const color = getRandomColor(name)
    let userName = name
    userName = userName.replace(/\s(de|De|DE|da|Da|DA|das|Das|DAS|do|Do|DO|dos|Dos|DOS|)\s/g, ' ') // Remove os de,da, dos,das.
    userName = userName.toUpperCase()
    const arr = userName.split(' ')
    if (arr.length > 1) {
      // Verifica se há algum nome com letra minúscula
      if ((arr[1][0].toUpperCase()) !== (arr[1][0])) {
        arr.splice(1, 1)
      }
      userName = `${arr[0]} ${arr[arr.length - 1]}` // Pega apenas o nome e o ultimo sobrenome
      const cleanName = userName.replace(/[^\w\s]/gi, '') // Remove os caracteres especiais
      const arrInitials = cleanName.match(/\b(\w)/gi) // Iniciais de cada parte do nome.
      const initials = clearUndefined(arrInitials)
      return { initials, color }
    }

    return { initials: arr[0][0], color }

  }
  return {}
}

export const isFunctionEmpty = f => /^function[^{]+\{\s*\}/m.test(f.toString())

export const Functions = {
  getNameInitials,
  isFunctionEmpty,
}

export const fetchApi = (route, options) => {
  return fetch(`${Values.API_URL}${route}`, options).then(resp => verifyResponse(resp))
    .then(response => response)
    .catch((err) => { throw err })
}