import PropTypes from 'prop-types'
import { pagePropTypes, pageDefaultProps } from './pagePropTypes'

export const userPropTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  userType: PropTypes.string,
  userStatus: PropTypes.string,
  pageAdmin: PropTypes.shape(pagePropTypes),
  authorization: PropTypes.string,
}

export const userDefaultProps = {
  _id: undefined,
  name: undefined,
  email: undefined,
  userType: undefined,
  userStatus: undefined,
  pageAdmin: pageDefaultProps,
  authorization: undefined,
}

