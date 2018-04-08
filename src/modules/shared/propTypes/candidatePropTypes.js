import { string, oneOfType, number } from 'prop-types'

export const candidatePropTypes = {
  id: string.isRequired,
  image: string,
  name: string.isRequired,
  number: oneOfType([number, string]),
  party: string,
}

export const candidateDefaultProps = {
  image: undefined,
  number: 0,
  party: '',
}
