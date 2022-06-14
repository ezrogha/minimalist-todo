import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get("screen")
export const SCREEN = { width, height }

export const SCREEN_PADDING = 20
export const CONTENT_WIDTH = SCREEN.width - (SCREEN_PADDING * 2)