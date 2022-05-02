export interface Item {
  site_id: string;
  country_default_time_zone: string;
  query: string;
  paging: Paging;
  results: Result[];
  sort: Paging;
  available_sorts: any[];
  filters: any[];
  available_filters: any[];
}

export interface Paging {
  total: number;
}

export interface Result {
  id: string;
  site_id: string;
  title: string;
  seller: Paging;
  price: number;
  prices: Paging;
  sale_price: null;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  stop_time: Date;
  condition: string;
  permalink: string;
  thumbnail: string;
  thumbnail_id: string;
  accepts_mercadopago: boolean;
  installments: Paging;
  address: Paging;
  shipping: Paging;
  seller_address: Paging;
  attributes: any[];
  original_price?: number;
  category_id: string;
  official_store_id: number;
  domain_id: string;
  catalog_product_id: null;
  tags: any[];
  order_backend: number;
  use_thumbnail_id: boolean;
  offer_score: null;
  offer_share: null;
  match_score: null;
  winner_item_id: null;
  melicoin: null;
}

export interface CartItem extends Result {
  quantity: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toItem(json: string): Item {
    return cast(JSON.parse(json), r('Item'));
  }

  public static itemToJson(value: Item): string {
    return JSON.stringify(uncast(value, r('Item')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Item: o(
    [
      { json: 'site_id', js: 'site_id', typ: '' },
      {
        json: 'country_default_time_zone',
        js: 'country_default_time_zone',
        typ: '',
      },
      { json: 'query', js: 'query', typ: '' },
      { json: 'paging', js: 'paging', typ: r('Paging') },
      { json: 'results', js: 'results', typ: a(r('Result')) },
      { json: 'sort', js: 'sort', typ: r('Paging') },
      { json: 'available_sorts', js: 'available_sorts', typ: a('any') },
      { json: 'filters', js: 'filters', typ: a('any') },
      { json: 'available_filters', js: 'available_filters', typ: a('any') },
    ],
    false
  ),
  Paging: o([], false),
  Result: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'site_id', js: 'site_id', typ: '' },
      { json: 'title', js: 'title', typ: '' },
      { json: 'seller', js: 'seller', typ: r('Paging') },
      { json: 'price', js: 'price', typ: 0 },
      { json: 'prices', js: 'prices', typ: r('Paging') },
      { json: 'sale_price', js: 'sale_price', typ: null },
      { json: 'currency_id', js: 'currency_id', typ: '' },
      { json: 'available_quantity', js: 'available_quantity', typ: 0 },
      { json: 'sold_quantity', js: 'sold_quantity', typ: 0 },
      { json: 'buying_mode', js: 'buying_mode', typ: '' },
      { json: 'listing_type_id', js: 'listing_type_id', typ: '' },
      { json: 'stop_time', js: 'stop_time', typ: Date },
      { json: 'condition', js: 'condition', typ: '' },
      { json: 'permalink', js: 'permalink', typ: '' },
      { json: 'thumbnail', js: 'thumbnail', typ: '' },
      { json: 'thumbnail_id', js: 'thumbnail_id', typ: '' },
      { json: 'accepts_mercadopago', js: 'accepts_mercadopago', typ: true },
      { json: 'installments', js: 'installments', typ: r('Paging') },
      { json: 'address', js: 'address', typ: r('Paging') },
      { json: 'shipping', js: 'shipping', typ: r('Paging') },
      { json: 'seller_address', js: 'seller_address', typ: r('Paging') },
      { json: 'attributes', js: 'attributes', typ: a('any') },
      { json: 'original_price', js: 'original_price', typ: null },
      { json: 'category_id', js: 'category_id', typ: '' },
      { json: 'official_store_id', js: 'official_store_id', typ: 0 },
      { json: 'domain_id', js: 'domain_id', typ: '' },
      { json: 'catalog_product_id', js: 'catalog_product_id', typ: null },
      { json: 'tags', js: 'tags', typ: a('any') },
      { json: 'order_backend', js: 'order_backend', typ: 0 },
      { json: 'use_thumbnail_id', js: 'use_thumbnail_id', typ: true },
      { json: 'offer_score', js: 'offer_score', typ: null },
      { json: 'offer_share', js: 'offer_share', typ: null },
      { json: 'match_score', js: 'match_score', typ: null },
      { json: 'winner_item_id', js: 'winner_item_id', typ: null },
      { json: 'melicoin', js: 'melicoin', typ: null },
    ],
    false
  ),
};
