// =============================================================================
// CASO PRÁCTICO: DataMart Global (e-Commerce)
// Entorno: MongoDB (Modelo Documental / NoSQL)
// Descripción: Aggregation pipelines para análisis comparativo de ventas.
// Volumen de datos: 15 clientes, 15 productos, 30 pedidos y 52 líneas de detalle.
// =============================================================================

// -----------------------------------------------------------------------------
// ANÁLISIS 1: Top 10 clientes por gasto total
// Objetivo: Identificar los 10 clientes con mayor gasto, mostrando nombre,
//           país, número de pedidos y monto total gastado.
// -----------------------------------------------------------------------------

db.orders.aggregate([
  // 1. Unir con la colección de clientes
  {
    $lookup: {
      from: "customers",
      localField: "id_cliente",
      foreignField: "id_cliente",
      as: "cliente"
    }
  },
  // 2. Aplanar el array de cliente resultante
  { 
    $unwind: "$cliente" 
  },
  // 3. Agrupar por cliente y calcular métricas
  {
    $group: {
      _id: { 
        id: "$id_cliente", 
        nombre: "$cliente.nombre", 
        pais: "$cliente.pais" 
      },
      total_pedidos: { $sum: 1 },
      monto_total: { $sum: "$total" }
    }
  },
  // 4. Ordenar de mayor a menor por gasto total
  { 
    $sort: { monto_total: -1 } 
  },
  // 5. Limitar a los 10 principales
  { 
    $limit: 10 
  },
  // 6. Formatear la salida final
  {
    $project: {
      _id: 0,
      nombre: "$_id.nombre",
      pais: "$_id.pais",
      total_pedidos: 1,
      monto_total: { $round: ["$monto_total", 2] }
    }
  }
]);


// -----------------------------------------------------------------------------
// ANÁLISIS 2: Top 3 productos más vendidos por categoría
// Objetivo: Identificar los 3 productos más vendidos (por unidades) dentro de
//           cada categoría, desempatando por ingresos totales.
// Estrategia: Simulación de función ventana mediante $sort previo, agrupación
//             de elementos en array con $push y recorte con $slice.
// -----------------------------------------------------------------------------

db.order_details.aggregate([
  // 1. Unir con la colección de productos
  {
    $lookup: {
      from: "products",
      localField: "id_producto",
      foreignField: "id_producto",
      as: "producto"
    }
  },
  // 2. Aplanar el array de producto
  { 
    $unwind: "$producto" 
  },
  // 3. Agrupar por producto y calcular acumulados
  {
    $group: {
      _id: { 
        categoria: "$producto.categoria", 
        nombre: "$producto.nombre_producto" 
      },
      cantidad_total: { $sum: "$cantidad" },
      ingresos_totales: { 
        $sum: { $multiply: ["$cantidad", "$precio_unitario"] } 
      }
    }
  },
  // 4. Ordenar previo para asegurar el orden interno del array
  { 
    $sort: { 
      "_id.categoria": 1, 
      cantidad_total: -1, 
      ingresos_totales: -1 
    } 
  },
  // 5. Agrupar por categoría y apilar productos en un array
  {
    $group: {
      _id: "$_id.categoria",
      productos: {
        $push: {
          nombre: "$_id.nombre",
          cantidad_total: "$cantidad_total",
          ingresos_totales: { $round: ["$ingresos_totales", 2] }
        }
      }
    }
  },
  // 6. Recortar el array a los 3 primeros productos por categoría
  {
    $project: {
      categoria: "$_id",
      top3: { $slice: ["$productos", 3] }
    }
  },
  // 7. Aplanar el array top3 para la presentación final
  { 
    $unwind: "$top3" 
  },
  // 8. Ordenar resultado final por categoría y cantidad
  { 
    $sort: { 
      categoria: 1, 
      "top3.cantidad_total": -1 
    } 
  }
]);
