/**********************************************************************************************************
* Pedido.js
* @author Enrique Romero
* @current version : 1.0
***********************************************************************************************************
* Version: 1.0
* Date: Mayo, 2026
* Tabla: cd_Pedido
***********************************************************************************************************/

if (typeof (Pedido) === "undefined")
    Pedido = { __namespace: true };

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
// TODO: Sustituir por el nombre lógico del campo boolean real de la tabla cd_Pedido
var CAMPO_BOOLEAN = "";

// Nombre del tab y la sección que se mostrará/ocultará
// Valores disponibles en el formulario "Información":
//   Tab General   → id: {fca3d77b-751a-4a88-9ec6-495aa58fa9be}  | sección: "general_section"
//   Tab Productos → name: "tab_3"                                | sección: "tab_3_section_1"
// TODO: Sustituir por el tab y sección que corresponda
var TAB_NOMBRE     = "";
var SECCION_NOMBRE = "";
// Valor numérico de la razón para el estado "Borrador" (statuscode)
// TODO: Sustituir por el valor real del optionset en tu entorno
var STATUSCODE_BORRADOR  = 1;


var NOTIFICACION_ID      = "1";
var MSG_PENDIENTE_ENVIO  = "El pedido está pendiente de envío.";

// ─── FORMULARIO ───────────────────────────────────────────────────────────────
Pedido.Form = {

    /**
     * Evento OnLoad del formulario.
     * Registrar en: Propiedades del formulario → Controladores de eventos → OnLoad
     * Parámetros: pasar el contexto de ejecución (Pass execution context as first parameter = true)
     */
    OnLoad: function (executionContext) {
        "use strict";
        debugger;
        Common.FormContext.Init(executionContext);

        // Registrar el onChange del campo boolean para que reaccione en tiempo real
        Common.FormContext.AddOnChange(CAMPO_BOOLEAN, Pedido.Form.OnChange_CampoBoolean);

        // Registrar el onChange del campo Razón para el estado
        Common.FormContext.AddOnChange("statuscode", Pedido.Form.OnChange_RazonEstado);

        // Aplicar lógica inicial en carga del formulario
        Pedido.Form._aplicarVisibilidadSeccion();
    },

    /**
     * Evento OnChange del campo boolean.
     * También puede registrarse directamente en las propiedades del campo.
     */
    OnChange_CampoBoolean: function () {
        "use strict";
        Pedido.Form._aplicarVisibilidadSeccion();
    },

    /**
     * Evento OnChange del campo Razón para el estado (statuscode).
     * Registrado mediante AddOnChange en el OnLoad del formulario.
     *
     * Muestra una notificación informativa cuando el pedido está en estado Borrador,
     * indicando que está pendiente de envío. Para el resto de estados limpia la notificación.
     */
    OnChange_RazonEstado: function (executionContext) {
        "use strict";

        var statuscode = Common.FormContext.GetValue("statuscode");

        Common.FormContext.clearFormNotification(NOTIFICACION_ID);

        if (statuscode === STATUSCODE_BORRADOR) {
            Common.FormContext.setFormNotification(MSG_PENDIENTE_ENVIO, "INFO", NOTIFICACION_ID);
        }
    },

    // ─── PRIVADO ──────────────────────────────────────────────────────────────

    /**
     * Muestra u oculta la sección en función del valor del campo boolean.
     * true  → muestra la sección
     * false → oculta la sección
     */
    _aplicarVisibilidadSeccion: function () {
        "use strict";

        var valor = Common.FormContext.GetValue(CAMPO_BOOLEAN);
        var visible = valor === true;

        Common.FormContext.SectionVisible(TAB_NOMBRE, SECCION_NOMBRE, visible);
    }
};
