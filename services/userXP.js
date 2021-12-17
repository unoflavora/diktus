var axios = require("axios").default;

// let token

// var options = {
//   method: 'POST',
//   url: 'https://diktus.jp.auth0.com/oauth/token',
//   headers: {'content-type': 'application/x-www-form-urlencoded'},
//   data: {
//     grant_type: 'client_credentials',
//     client_id: 'SMHHw0Bu1sLH1E25n6xh73ON3t9AcPs1',
//     client_secret: 'BYJ9oFNYIOsiYspi8-PyOTQH72G0N1pLSKrISHDbaw0bnWcxwEn5EDACXSo6byDv',
//     audience: 'https://diktus.jp.auth0.com/api/v2/'
//   }
// };

// axios.request(options).then(function (response) {
//   token = response.data;
//   console.log(token)
// }).catch(function (error) {
//   console.error(error);
// });

async function get(id) {
  const options = {
    method: 'GET',
    url: `https://diktus.jp.auth0.com/api/v2/users/${id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    }
  }
  const res = await axios.request(options)
  return(res.data.user_metadata)
}

async function updateXP(user_id, xp) {
  var options = {
    method: 'PATCH',
    url: `https://diktus.jp.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    },
    data: {
      user_metadata: {
        xp:xp
      },
    }
  }

  const res = await axios.request(options)
  return(res.data.user_metadata.xp)
}

async function updateTarget(user_id, target) {
  var options = {
    method: 'PATCH',
    url: `https://diktus.jp.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    },
    data: {
      user_metadata: {
        target:target
      },
    }
  }

  const res = await axios.request(options)
  console.log(res)
  return(res.data.user_metadata.target)
}

async function updateTanggalTes(user_id, tanggal) {
  var options = {
    method: 'PATCH',
    url: `https://diktus.jp.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    },
    data: {
      user_metadata: {
        tes:tanggal
      },
    }
  }

  const res = await axios.request(options)
  console.log(res)
  return(res.data.user_metadata.target)
}



async function updateLatihan(resetToday, user_id) {
  var options = {
    method: 'PATCH',
    url: `https://diktus.jp.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    },
    data: {
      user_metadata: {
        today:resetToday
      },
    }
  }

  await axios.request(options)
}

async function updateHasil(user_id, tipe, data) {
  let oldData = await get(user_id)

  let newData = {...oldData, 'TPS': data['TPS'], skor: data.skor, nilai: data.nilai}

  newData[tipe] = data[tipe]

  if(tipe === 'Saintek') {
    ['Biologi', 'Fisika', 'Kimia', 'Matematika'].map(matpel => newData[matpel] = data[matpel])
  } else {
    ['Sejarah', 'Ekonomi', 'Geografi', 'Sosiologi'].map(matpel => newData[matpel] = data[matpel])
  }

  let tps = [  "Kemampuan Penalaran Umum",
  "Kemampuan Memahami Bacaan dan Menulis",
  "Pengetahuan dan Pemahaman Umum",
  "Pengetahuan Kuantitatif"]

  tps.map(matpel => {
    newData[matpel] = data[matpel] || 0
  })

  newData.mark[data.date] = data.skor
  newData.today.TryOut = data.date
  newData['nilai'] = {...data['Saintek'], ...data['TPS']}

  let options = {
    method: 'PATCH',
    url: `https://diktus.jp.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${process.env.AUTH0_TOKENTEST} `, 
      'content-type': 'application/json'
    },
    data: {
      user_metadata: {...newData},
    }
  }
  

  try {
    const res = await axios.request(options)
    return(res.data.user_metadata.target)
  } catch(e) {
    console.log(e.message)
  }
}

const exports = {
  get, updateXP, updateTarget, updateTanggalTes, updateLatihan, updateHasil
}

const user = {
  "Biologi": {
    "Metabolisme": 1,
    "Genetika": 1,
    "Sel": 0.9,
    "Jaringan dan Perkembangan Tumbuhan": 0.55,
    "Sistem Organ dan Fisiologis Manusia-Hewan": 0.6,
    "Karakteristik dan Peranan Makhluk Hidup": 0.4,
    "Keanekaragaman dan Sistem Klasifikasi Makhluk Hidup": 0.5,
    "Evolusi": 1,
    "Ekosistem": 0.8,
    "Perubahan Lingkungan dan Konservasi": 0.7,
    "Bioteknologi": 0.6
  },
  "Saintek": {
    "Matematika": 909,
    "Fisika": 683,
    "Kimia": 826,
    "Biologi": 642
  },
  "TPS": {
    "Penalaran Umum": 801,
    "Pengetahuan Kuantitatif": 799,
    "Pengetahuan dan Pemahaman Umum": 709,
    "Kemampuan Memahami Bacaan dan Menulis": 642
  },
  "mark": {
    "11-09-2021": 549,
    "15-10-2021": 655,
    "27-10-2021": 751
  },
  "nilai": {
    "Matematika": 909,
    "Fisika": 683,
    "Kimia": 826,
    "Biologi": 642,
    "Penalaran Umum": 801,
    "Pemahaman Bacaan dan Menulis": 642,
    "Pengetahuan Umum": 709,
    "Pengetahuan Kuantitatif": 799
  },
  "skor": 751,
  "target": "752",
  "tes": "01-03-2022",
  "tipe": "Saintek",
  "xp": 150,
  "today": {
    "TryOut": "27-10-2021",
    "PopQuiz": "27-10-2021",
    "Latihan": {
      "date":"27-10-2021",
      "value": 1
    }
  }
}
export default exports