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
      .select()
      .order('id', { ascending: true })

    return { data, error };
  }

  async create(table, values) {
    const { data, error } = await this.supabase
      .from(table)
      .insert(values)
      .select()

    return { data, error };
  }

  async update(table, values, where) {
    const key = Object.keys(where)[0];
    const value = where[key];

    const { data, error } = await this.supabase
      .from(table)
      .update(values)
      .eq(key, value)
      .select();

      return { data, error };
  }

  async destroy(table, where) {
    const key = Object.keys(where)[0];
    const value = where[key];

    const { error } = await this.supabase
      .from(table)
      .delete()
      .eq(key, value)

    return { error };
  }
}

module.exports = Database;