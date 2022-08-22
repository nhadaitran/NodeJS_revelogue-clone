module.exports = {
    port: process.env.PORT || 3001,
    mongo_uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/revelogue',
    // mongo_uri: process.env.MONGO_URI || 'mongodb+srv://nhadaitran:t6wuOK8C334oHNpS@cluster0.yxd1con.mongodb.net/?retryWrites=true&w=majority',
    secret: process.env.ACCESS_TOKEN_SECRET || "d175f9f5783480869f0030ec1432e4b72ff43d4f8a19cf0db04cb9d0120a0ef7bccd03887e4915f197a01f6c7aaf42389c66cb86e02b617c6bba3bb5fcd4bcd6ed9cdea1eae8f37aa02db4c3af13aa260f172394dde4d503bf2f8635a29112c748d744b4da7af1fee866d8155f39d849d7ddd293bd1356e020416ca5bfcf91a1300088bfb837c0b50cb1abddb13e1295e63c4ddb8a9818ca07492036766096c36994236e21b6dd06fe88114ef9c32e7c147d3bd884152434352c908be2c7038c",
    refresh: process.env.REFRESH_TOKEN_SECRET || "bd78e18835ae7714016f79fd6a3787ff1b0cc0e2e110dcfda5af0ee70cd47c821c9cafb1d1fbf07c112c70620f85853b71dc2ff2af4251979687a0ec88972b71451b901f7bdf810bcf23c4e0613eebd1201aa1252f65ed2bbe5a28c012d8ece1dde657b1ed81a1bf4f1d6d352a0fb17061e822ad0948ba2b49e8c0af0e6f4af3",
}