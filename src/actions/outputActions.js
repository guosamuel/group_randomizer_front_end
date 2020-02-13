export const clearOutputs = () => {
  return {
    type: "CLEAR_OUTPUTS"
  }
}

export const randomizeOption = randomOption => {
  return {
    type: "RANDOM_OPTION",
    payload: randomOption
  }
}

export const randomizeOrder = options => {
  return {
    type: "RANDOM_ORDER",
    payload: options
  }
}
