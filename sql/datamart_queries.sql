-- =============================================================================
-- CASO PRÁCTICO: DataMart Global (e-Commerce)
-- Entorno: MySQL (Modelo Relacional)
-- Descripción: Análisis de ventas para evaluación comparativa frente a MongoDB.
-- Volumen de datos: 15 clientes, 15 productos, 30 pedidos y 52 líneas de detalle.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ANÁLISIS 1: Top 10 clientes por gasto total
-- Objetivo: Identificar los 10 clientes con mayor volumen de gasto, mostrando
--           su nombre, país, número total de pedidos y monto gastado.
-- -----------------------------------------------------------------------------

SELECT
    c.nombre,
    c.pais,
    COUNT(o.id_pedido) AS total_pedidos,
    ROUND(SUM(o.total), 2) AS monto_total
FROM customers c
JOIN orders o ON c.id_cliente = o.id_cliente
GROUP BY c.id_cliente, c.nombre, c.pais
ORDER BY monto_total DESC
LIMIT 10;


-- -----------------------------------------------------------------------------
-- ANÁLISIS 2: Top 3 productos más vendidos por categoría
-- Objetivo: Identificar los 3 productos con más unidades vendidas dentro de cada
--           categoría, mostrando sus unidades totales e ingresos generados.
-- Nota: Se utiliza ROW_NUMBER() con PARTITION BY para reiniciar la numeración
--       por categoría y desempate secundario por ingresos totales.
-- -----------------------------------------------------------------------------

WITH ranked AS (
    SELECT
        p.categoria,
        p.nombre_producto,
        SUM(od.cantidad) AS cantidad_total,
        ROUND(SUM(od.cantidad * od.precio_unitario), 2) AS ingresos_totales,
        ROW_NUMBER() OVER (
            PARTITION BY p.categoria
            ORDER BY SUM(od.cantidad) DESC, SUM(od.cantidad * od.precio_unitario) DESC
        ) AS rn
    FROM products p
    JOIN order_details od ON p.id_producto = od.id_producto
    GROUP BY p.id_producto, p.categoria, p.nombre_producto
)
SELECT 
    categoria, 
    nombre_producto, 
    cantidad_total, 
    ingresos_totales
FROM ranked
WHERE rn <= 3
ORDER BY categoria, cantidad_total DESC;
