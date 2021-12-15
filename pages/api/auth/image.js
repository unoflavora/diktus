var ImageKit = require("imagekit");

export default async function handler(request, response) {
  try {
    var imagekit = new ImageKit({
      publicKey : "public_TxGtjJssWHCXc1UswoVy1G8F9Mg=",
      privateKey : "private_h+qHjbSkNKFTvB8X5yS7bM226ug=",
      urlEndpoint : "https://ik.imagekit.io/ptnbanks"
    });
  
    var authenticationParameters = imagekit.getAuthenticationParameters();
    console.log(authenticationParameters)
    response.status(200).json(authenticationParameters)
  } catch(e) {
    response.status(500).json(e)
  }
}
