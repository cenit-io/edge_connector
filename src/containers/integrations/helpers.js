export const getIntegrationCardOptions = (item) => {
  const { channel, authorized } = item;
  const hasNotBrands = !!channel.match(/^eCw(Shopee|Shopify)/);
  const hasNotCategories = !!channel.match(/^eCw(Shopify)/);
  const hasNotSLocations = !!channel.match(/^eCw(Lazada|Shopee|Qoo10|MercadoLibre|Prestashop)/);
  const hasNotLogistics = !!channel.match(/^eCw(Lazada|Shopify|Qoo10|MercadoLibre|Prestashop)/);

  const options = [
    { value: 'delete', name: 'Delete', disabled: authorized },
    { value: 'import products', name: 'Import products', disabled: !authorized },
    { value: 'import orders', name: 'Import orders', disabled: !authorized },
    { value: 'import categories', name: 'Import categories', disabled: !authorized || hasNotCategories },
    { value: 'import brands', name: 'Import brands', disabled: !authorized || hasNotBrands },
    { value: 'import stock locations', name: 'Import stock locations', disabled: !authorized || hasNotSLocations },
    { value: 'import logistics', name: 'Import logistics', disabled: !authorized || hasNotLogistics }
  ];

  options.unshift(
    authorized ? { value: 'unauthorize', name: 'Unauthorize' } : { value: 'authorize', name: 'Authorize' }
  );
  return options;
};