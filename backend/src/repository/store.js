
const store = new Map();

export function get(code) {
  return store.get(code) || null;
}

export function has(code) {
  return store.has(code);
}


export function set(code, data) {
  store.set(code, data);
}


export function update(code, updater) {
  const record = store.get(code);
  if (record) {
    updater(record);
    store.set(code, record);
  }
}
