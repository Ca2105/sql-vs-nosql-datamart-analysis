# sql-vs-nosql-datamart-analysis
Análisis comparativo de datos de e-commerce utilizando MySQL (SQL) y MongoDB (NoSQL).
# 📊 Análisis Comparativo de E-Commerce: MySQL vs. MongoDB

Este proyecto forma parte del Máster en Data Science en **EBIS Business Techschool**. El objetivo principal fue realizar un análisis de ventas sobre el negocio ficticio **DataMart Global**, ejecutando consultas equivalentes en dos entornos de bases de datos con paradigmas distintos: relacional (SQL) y NoSQL (orientado a documentos).

---

## 🎯 Objetivos de Negocio
* Consolidar métricas clave de ventas y volumen de pedidos por cliente.
* Evaluar las ventas por categoría de producto.
* Comparar la sintaxis, legibilidad y modelo mental de desarrollo entre consultas relacionales y pipelines de agregación NoSQL.

---

## 🛠️ Tecnologías Utilizadas
* **Base de Datos Relacional:** MySQL (SQL ANSI, `JOINs`, `GROUP BY`, agregaciones)
* **Base de Datos NoSQL:** MongoDB (Aggregation Framework: `$match`, `$group`, `$unwind`, `$lookup`)
* **Asistencia Técnica:** Claude Code (Anthropic) para optimización y estructuración de código.

---

## 📂 Estructura del Repositorio
* `/sql/`: Contiene los scripts `.sql` con las tablas y consultas desarrolladas en MySQL.
* `/mongodb/`: Contiene los scripts `.js` con los pipelines de agregación ejecutados en MongoDB.

---

## 💡 Principales Hallazgos & Conclusiones
1. **Paridad de Resultados:** Ambas herramientas produjeron un **100% de coincidencia** en los resultados de negocio.
2. **Modelo Relacional (SQL):** Mayor rigor estructural, óptimo para consultas financieras y análisis donde las relaciones de entidad están fuertemente definidas.
3. **Modelo NoSQL (MongoDB):** Mayor flexibilidad de esquema, idóneo para datos no estructurados o catálogos dinámicos, aunque requiere pipelines de agregación más extensos para simular cruces de datos (`$lookup`).

---

## 🔗 Enlaces de Interés
* **Portafolio en Notion:** [Ver caso de estudio documentado](AQUÍ_TU_LINK_DE_NOTION)
* **LinkedIn:** [Ver publicación del proyecto](AQUÍ_TU_LINK_DEL_POST)
