<?php


// cria o array com a temperatura igual a 10
$response = array(
  'temperatura' => 10,
  'gas' => 5,
  'corrente' => '20'
);

// define o cabeçalho da resposta como JSON

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// imprime o array como JSON
echo json_encode($response);
