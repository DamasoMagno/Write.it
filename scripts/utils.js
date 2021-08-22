const Utils = {
  getParamsURL(paramsInURL){
    const urlParams = window.location.search
    const params = new URLSearchParams(urlParams)
    const param = params.get(paramsInURL)
    return param;
  },
}

export { Utils }