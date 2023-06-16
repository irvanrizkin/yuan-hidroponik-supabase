const { createClient } = require("@supabase/supabase-js");

class Database {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      }
    });
  }

  async findAll(table) {
    const { data, error } = await this.supabase
      .from(table)
      .select();

    return { data, error };
  }

  async create(table, values) {
    const { data, error } = await this.supabase
      .from(table)
      .insert(values)
      .select()

    return { data, error };
  }
}

module.exports = Database;