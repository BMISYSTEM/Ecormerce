<?php
// SDK de Mercado Pago
require '/vendor/autoload.php';
// Agrega credenciales
MercadoPago\SDK::setAccessToken('TEST-4852397463321895-030101-e77467779e20e68c4eb1711512dd00d4-507411332');

// // Crea un objeto de preferencia
// $preference = new MercadoPago\Preference();

// // Crea un ítem en la preferencia
// $item = new MercadoPago\Item();
// $item->title = 'Mi producto';
// $item->quantity = 1;
// $item->unit_price = 75;
// $preference->items = array($item);
// $preference->save();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mercado pago</title>
</head>
<body>
<!-- <script src="https://sdk.mercadopago.com/js/v2"></script> -->

<div class="cho-container"></div>
<!-- <script>
  const mp = new MercadoPago('TEST-dae634cf-01ef-46c6-bf32-1563714954d9', {
    locale: 'es-AR'
  });

  mp.checkout({
    preference: {
      id: '<?php echo $preference->id;?>'
    },
    render: {
      container: '.cho-container',
      label: 'Pagar',
    }
  });
</script> -->
</body>
</html>