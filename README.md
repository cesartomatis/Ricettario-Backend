# Ricettario Backend

Add a config.json file in the config folder with the following data:

{
"dev": {
"PORT": PORT_NUMBER,
"MONGODB_URI": DB_URI,
"JWT_SECRET": JWT_KEY,
"SESSION_EXPIRATION": EXPIRATION_TIME
}
}

---

Change all references of joi to @hapi/joi

---
