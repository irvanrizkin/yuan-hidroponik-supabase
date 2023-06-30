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
      .order('createdAt', { ascending: true })

    return { data, error };
  }

  async findByPk(table, id) {
    const { data, error } = await this.supabase
      .from(table)
      .select()
      .eq('id', id)
      .single()

    return { data, error };
  }

  async findOne(table, where) {
    const key = Object.keys(where)[0];
    const value = where[key];

    const { data, error } = await this.supabase
      .from(table)
      .select()
      .eq(key, value)
      .single()

    return { data, error };
  }

  async findWhere(table, where) {
    const key = Object.keys(where)[0];
    const value = where[key];

    const { data, error } = await this.supabase
      .from(table)
      .select()
      .eq(key, value)
      .order('createdAt', { ascending: true })

    return { data, error };
  }

  async findWhereGreaterEqual(table, where, greater) {
    const key = Object.keys(where)[0];
    const value = where[key];
    const keyGreater = Object.keys(greater)[0];
    const valueGreater = greater[keyGreater];
    

    const { data, error } = await this.supabase
      .from(table)
      .select()
      .eq(key, value)
      .gte(keyGreater, valueGreater)
      .order('createdAt', { ascending: true })

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

  setOnDatabaseChanges(schema, table, callback) {
    this.supabase.channel('custom-all-channel')
      .on('postgres_changes',{
        event: '*',
        schema,
        table,
      }, (payload) => {
        callback(payload);
      }).subscribe();
  }
}

module.exports = Database;