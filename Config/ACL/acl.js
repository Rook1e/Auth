module.exports = acl = {}

acl['*'] = {
'/':['pass']
}

acl['GET'] = {
'/':['pass','fail']
}
