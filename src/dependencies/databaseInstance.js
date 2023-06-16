const Database = require("../services/Database");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

module.exports = new Database(supabaseUrl, supabaseKey);