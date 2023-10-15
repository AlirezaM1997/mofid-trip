export const LtrSpecificStyles = `
<style>
input::-webkit-input-placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

input:-ms-input-placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

input:-moz-placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

input::-moz-placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
</style>
`

export const RtlSpecificStyles = `<style>
input::-webkit-input-placeholder {
  font-family: DanaNoEn;
  font-weight: 400;
}

input:-ms-input-placeholder {
  font-family: DanaNoEn;
  font-weight: 400;
}

input:-moz-placeholder {
  font-family: DanaNoEn;
  font-weight: 400;
}

input::-moz-placeholder {
  font-family: DanaNoEn;
  font-weight: 400;
}
</style>`
