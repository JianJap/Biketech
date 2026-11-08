// ============================================================================
// CicloTaller Pro | SGIP-BikeTech - Prototipo Funcional
// Negocio Independiente de Servicio Técnico, Mantenimiento y Repuestos de Bicicletas
// ============================================================================

const INITIAL_STATE = {
  currentRole: 'ADMIN',
  roles: {
    ADMIN: {
      code: 'ADMIN',
      name: 'Administrador General (Andrés Darío Rodríguez)',
      token: 'JWT-HS256-98F2A...4E1B',
      permissions: ['RBAC_CONFIG', 'OST_CREATE', 'OST_MANAGE', 'INV_EDIT', 'INV_ADJUST', 'OC_APPROVE', 'POS_LIQUIDATE', 'REPORTS_EXPORT']
    },
    MECANICO: {
      code: 'MECANICO',
      name: 'Técnico Mecánico Líder (Carlos Andrés Mejía)',
      token: 'JWT-HS256-31C8D...7A90',
      permissions: ['OST_CREATE', 'OST_MANAGE', 'INV_VIEW']
    },
    CAJERO: {
      code: 'CAJERO',
      name: 'Recepcionista / Cajero POS (Laura Valentina Gómez)',
      token: 'JWT-HS256-74B1E...2F04',
      permissions: ['OST_CREATE', 'POS_LIQUIDATE', 'INV_VIEW']
    },
    ALMACEN: {
      code: 'ALMACEN',
      name: 'Almacenista de Repuestos (Julián David Vargas)',
      token: 'JWT-HS256-59A4C...8D32',
      permissions: ['INV_EDIT', 'INV_ADJUST', 'OC_APPROVE', 'INV_VIEW']
    }
  },
  auditLogs: [
    { id: 'AUD-904', timestamp: '2026-11-08 15:42:10', user: 'Andrés Rodríguez (ADMIN)', action: 'Verificación de sesión JWT y permisos RBAC', module: 'Seguridad (HU-01)', result: 'Autorizado (28 ms)' },
    { id: 'AUD-903', timestamp: '2026-11-08 15:18:04', user: 'Carlos Mejía (MECANICO)', action: 'Imputación repuesto SKU-FR-001 (x2) a orden OST-2026-0101 con Row-Lock ACID', module: 'Taller (HU-03)', result: 'Transacción ACID OK' },
    { id: 'AUD-902', timestamp: '2026-11-08 14:50:22', user: 'Julián Vargas (ALMACEN)', action: 'Recepción en bodega Orden de Compra OC-2026-0041 (+10 discos Shimano RT-54)', module: 'Compras (HU-05)', result: 'Kardex Actualizado' },
    { id: 'AUD-901', timestamp: '2026-11-08 14:12:39', user: 'Laura Gómez (CAJERO)', action: 'Liquidación POS Orden OST-2026-0100 ($565.250 IVA incl.) - Pago Transferencia Nequi', module: 'POS (HU-06)', result: 'Comprobante #POS-881' },
    { id: 'AUD-900', timestamp: '2026-11-08 11:05:17', user: 'Carlos Mejía (MECANICO)', action: 'Intento de ajuste manual de costo unitario en catálogo SKU-TR-002', module: 'Inventario (HU-04)', result: 'Denegado por RBAC (403)' }
  ],
  serviceOrders: [
    {
      id: 'OST-2026-0101',
      date: '2026-11-07 09:30',
      deliveryDate: '2026-11-08 17:00',
      clientName: 'Mauricio Restrepo Cano',
      clientDoc: 'CC 80.145.920',
      clientPhone: '310-458-9210',
      bikeBrand: 'Trek Marlin 7 Gen 3',
      bikeType: 'MTB (Rin 29")',
      bikeSerial: 'WTU2389014T',
      bikeColor: 'Rojo / Negro Mate',
      serviceType: 'Mantenimiento General + Purgado Frenos Hidráulicos',
      mechanic: 'Carlos Andrés Mejía',
      status: 'Lista para Entrega',
      diagnosis: 'Desgaste del 85% en pastillas de freno delanteras/traseras, cadena elongada (>0.75%), presencia de burbujas en línea hidráulica trasera.',
      checklist: { frenos: true, transmision: true, rodamientos: true, centradoRines: true, torqueSeguridad: true },
      laborCost: 85000,
      parts: [
        { sku: 'SKU-FR-001', name: 'Pastillas Freno Shimano B05S-RX Resina (Par)', qty: 2, unitPrice: 42000 },
        { sku: 'SKU-TR-001', name: 'Cadena Shimano Deore CN-M6100 12v', qty: 1, unitPrice: 135000 },
        { sku: 'SKU-IN-002', name: 'Aceite Mineral Frenos Hidráulicos Shimano 100ml', qty: 1, unitPrice: 45000 }
      ]
    },
    {
      id: 'OST-2026-0102',
      date: '2026-11-08 08:15',
      deliveryDate: '2026-11-08 18:30',
      clientName: 'Diana Carolina Pineda',
      clientDoc: 'CC 52.891.304',
      clientPhone: '315-892-3341',
      bikeBrand: 'Specialized Allez E5',
      bikeType: 'Ruta (Rin 700c)',
      bikeSerial: 'WSBC601094821N',
      bikeColor: 'Gris Titanio',
      serviceType: 'Ajuste Electrónico/Mecánico de Transmisión + Cambio de Corazas',
      mechanic: 'Diego Fernando Soto',
      status: 'En Reparación',
      diagnosis: 'Corte lateral en coraza trasera 700x25c, desajuste de tensión en descarrilador delantero Shimano Claris.',
      checklist: { frenos: true, transmision: true, rodamientos: false, centradoRines: true, torqueSeguridad: false },
      laborCost: 55000,
      parts: [
        { sku: 'SKU-LL-002', name: 'Coraza Continental Ultra Sport III 700x25c', qty: 2, unitPrice: 130000 }
      ]
    },
    {
      id: 'OST-2026-0103',
      date: '2026-11-08 10:40',
      deliveryDate: '2026-11-09 12:00',
      clientName: 'Camilo Andrés Mora',
      clientDoc: 'CC 1.018.442.910',
      clientPhone: '300-712-6540',
      bikeBrand: 'Giant Talon 1',
      bikeType: 'MTB (Rin 29")',
      bikeSerial: 'GNT9928410K',
      bikeColor: 'Azul Metálico',
      serviceType: 'Mantenimiento Suspensión Delantera 50 Horas + Centrado de Rines',
      mechanic: 'Carlos Andrés Mejía',
      status: 'En Diagnóstico',
      diagnosis: 'Fuga leve de lubricación en retenes de barras de 32mm; rin trasero con desviación lateral de 2.5mm.',
      checklist: { frenos: true, transmision: false, rodamientos: false, centradoRines: false, torqueSeguridad: false },
      laborCost: 75000,
      parts: [
        { sku: 'SKU-SU-001', name: 'Kit Retenes y Guardapolvos Suspensión RockShox 32mm', qty: 1, unitPrice: 125000 }
      ]
    },
    {
      id: 'OST-2026-0104',
      date: '2026-11-08 13:20',
      deliveryDate: '2026-11-09 16:00',
      clientName: 'Natalia Ospina Ríos',
      clientDoc: 'CC 1.032.776.105',
      clientPhone: '320-654-1189',
      bikeBrand: 'GW Sacramento Gravel',
      bikeType: 'Gravel (Rin 700c)',
      bikeSerial: 'GW77412098B',
      bikeColor: 'Verde Oliva',
      serviceType: 'Mantenimiento Preventivo + Conversión Tubeless',
      mechanic: 'Diego Fernando Soto',
      status: 'Recibida',
      diagnosis: 'Lavado ultrasónico de transmisión, engrase de caja centro Hollowtech II y recarga de líquido sellante.',
      checklist: { frenos: false, transmision: false, rodamientos: false, centradoRines: false, torqueSeguridad: false },
      laborCost: 60000,
      parts: [
        { sku: 'SKU-IN-001', name: "Líquido Sellante Tubeless Stan's NoTubes 500ml", qty: 1, unitPrice: 75000 }
      ]
    },
    {
      id: 'OST-2026-0100',
      date: '2026-11-06 11:00',
      deliveryDate: '2026-11-07 16:00',
      clientName: 'Sebastián Vargas Pardo',
      clientDoc: 'CC 79.941.002',
      clientPhone: '311-234-8890',
      bikeBrand: 'Scott Scale 980',
      bikeType: 'MTB (Rin 29")',
      bikeSerial: 'SCT4489102M',
      bikeColor: 'Negro / Amarillo Neón',
      serviceType: 'Cambio de Relación (Pacha + Cadena 12v) y Alistamiento Competencia',
      mechanic: 'Carlos Andrés Mejía',
      status: 'Entregada',
      diagnosis: 'Cambio preventivo de transmisión completa de 12 velocidades y ajuste de línea de cadena.',
      checklist: { frenos: true, transmision: true, rodamientos: true, centradoRines: true, torqueSeguridad: true },
      laborCost: 45000,
      parts: [
        { sku: 'SKU-TR-002', name: 'Pacha Cassette Shimano Deore CS-M6100 12v (10-51T)', qty: 1, unitPrice: 340000 },
        { sku: 'SKU-TR-001', name: 'Cadena Shimano Deore CN-M6100 12v', qty: 1, unitPrice: 135000 }
      ]
    }
  ],
  inventory: [
    { sku: 'SKU-TR-001', name: 'Cadena Shimano Deore CN-M6100 12v (126 Eslabones)', category: 'Transmisión', brand: 'Shimano', location: 'Estante A-01', avgCost: 92000, price: 135000, stock: 8, minStock: 5 },
    { sku: 'SKU-TR-002', name: 'Pacha Cassette Shimano Deore CS-M6100 12v 10-51T', category: 'Transmisión', brand: 'Shimano', location: 'Estante A-02', avgCost: 245000, price: 340000, stock: 2, minStock: 4 },
    { sku: 'SKU-FR-001', name: 'Pastillas de Freno Shimano B05S-RX Resina (Par)', category: 'Frenos', brand: 'Shimano', location: 'Estante B-01', avgCost: 24000, price: 42000, stock: 3, minStock: 6 },
    { sku: 'SKU-FR-002', name: 'Disco de Freno Shimano RT-54 Center Lock 160mm', category: 'Frenos', brand: 'Shimano', location: 'Estante B-03', avgCost: 52000, price: 82000, stock: 10, minStock: 4 },
    { sku: 'SKU-LL-001', name: 'Coraza Maxxis Ikon 29x2.20 EXO TR Tubeless Ready', category: 'Llantas y Neumáticos', brand: 'Maxxis', location: 'Rack C-01', avgCost: 135000, price: 195000, stock: 2, minStock: 4 },
    { sku: 'SKU-LL-002', name: 'Coraza Continental Ultra Sport III 700x25c', category: 'Llantas y Neumáticos', brand: 'Continental', location: 'Rack C-02', avgCost: 88000, price: 130000, stock: 9, minStock: 4 },
    { sku: 'SKU-LL-003', name: 'Neumático Kenda 29x1.95/2.125 Válvula Presta 48mm', category: 'Llantas y Neumáticos', brand: 'Kenda', location: 'Estante C-04', avgCost: 14500, price: 26000, stock: 18, minStock: 10 },
    { sku: 'SKU-SU-001', name: 'Kit Retenes y Guardapolvos Suspensión RockShox 32mm', category: 'Suspensión', brand: 'RockShox', location: 'Gaveta D-01', avgCost: 78000, price: 125000, stock: 3, minStock: 3 },
    { sku: 'SKU-IN-001', name: "Líquido Sellante Tubeless Stan's NoTubes 500ml", category: 'Lubricantes e Insumos', brand: "Stan's", location: 'Estante E-01', avgCost: 48000, price: 75000, stock: 7, minStock: 4 },
    { sku: 'SKU-IN-002', name: 'Aceite Mineral Frenos Hidráulicos Shimano 100ml', category: 'Lubricantes e Insumos', brand: 'Shimano', location: 'Estante E-02', avgCost: 28000, price: 45000, stock: 6, minStock: 3 }
  ],
  kardex: [
    { id: 'KDX-409', date: '2026-11-08 15:18', sku: 'SKU-FR-001', item: 'Pastillas Freno Shimano B05S-RX', type: 'SALIDA TALLER', ref: 'OST-2026-0101', prevStock: 5, delta: -2, newStock: 3, unitCost: 24000, user: 'Carlos Mejía' },
    { id: 'KDX-408', date: '2026-11-08 14:50', sku: 'SKU-FR-002', item: 'Disco Freno Shimano RT-54 160mm', type: 'ENTRADA COMPRA', ref: 'OC-2026-0041', prevStock: 0, delta: +10, newStock: 10, unitCost: 52000, user: 'Julián Vargas' },
    { id: 'KDX-407', date: '2026-11-08 11:30', sku: 'SKU-SU-001', item: 'Kit Retenes RockShox 32mm', type: 'SALIDA TALLER', ref: 'OST-2026-0103', prevStock: 4, delta: -1, newStock: 3, unitCost: 78000, user: 'Carlos Mejía' },
    { id: 'KDX-406', date: '2026-11-08 09:10', sku: 'SKU-LL-002', item: 'Coraza Continental Ultra Sport 700x25c', type: 'SALIDA TALLER', ref: 'OST-2026-0102', prevStock: 11, delta: -2, newStock: 9, unitCost: 88000, user: 'Diego Soto' },
    { id: 'KDX-405', date: '2026-11-07 17:40', sku: 'SKU-LL-003', item: 'Neumático Kenda 29" Presta 48mm', type: 'AJUSTE FÍSICO', ref: 'AUD-INV-11', prevStock: 19, delta: -1, newStock: 18, unitCost: 14500, user: 'Julián Vargas' }
  ],
  purchaseOrders: [
    {
      id: 'OC-2026-0042',
      date: '2026-11-08',
      supplier: 'HA Bicicletas S.A.S. (Distribuidor Oficial Shimano)',
      nit: '890.903.412-1',
      status: 'Emitida / En Tránsito',
      items: [
        { sku: 'SKU-TR-002', name: 'Pacha Cassette Shimano Deore CS-M6100 12v', qty: 6, unitCost: 245000 },
        { sku: 'SKU-FR-001', name: 'Pastillas de Freno Shimano B05S-RX Resina (Par)', qty: 15, unitCost: 24000 }
      ],
      total: 1830000
    },
    {
      id: 'OC-2026-0043',
      date: '2026-11-08',
      supplier: 'Maxxis & RockShox Latam Distribuciones',
      nit: '900.412.889-5',
      status: 'Borrador',
      items: [
        { sku: 'SKU-LL-001', name: 'Coraza Maxxis Ikon 29x2.20 EXO TR Tubeless Ready', qty: 8, unitCost: 135000 },
        { sku: 'SKU-SU-001', name: 'Kit Retenes y Guardapolvos Suspensión RockShox 32mm', qty: 5, unitCost: 78000 }
      ],
      total: 1470000
    },
    {
      id: 'OC-2026-0041',
      date: '2026-11-05',
      supplier: 'HA Bicicletas S.A.S. (Distribuidor Oficial Shimano)',
      nit: '890.903.412-1',
      status: 'Recibida en Bodega',
      items: [
        { sku: 'SKU-FR-002', name: 'Disco de Freno Shimano RT-54 Center Lock 160mm', qty: 10, unitCost: 52000 },
        { sku: 'SKU-TR-001', name: 'Cadena Shimano Deore CN-M6100 12v', qty: 6, unitCost: 92000 }
      ],
      total: 1072000
    }
  ],
  posTransactions: [
    {
      id: 'POS-2026-0881',
      date: '2026-11-08 14:12',
      ostRef: 'OST-2026-0100',
      client: 'Sebastián Vargas Pardo',
      subtotalParts: 475000,
      subtotalLabor: 45000,
      discount: 0,
      ivaInternal: 98800,
      totalPaid: 618800,
      paymentMethod: 'Transferencia Interna (Nequi / QR)',
      cashier: 'Laura Valentina Gómez'
    },
    {
      id: 'POS-2026-0880',
      date: '2026-11-07 16:45',
      ostRef: 'VENTA-MOSTRADOR',
      client: 'Andrés Felipe Lozano',
      subtotalParts: 156000,
      subtotalLabor: 0,
      discount: 5000,
      ivaInternal: 28690,
      totalPaid: 179690,
      paymentMethod: 'Efectivo en Caja',
      cashier: 'Laura Valentina Gómez'
    }
  ],
  selectedOstId: 'OST-2026-0101',
  selectedPosOstId: 'OST-2026-0101'
};

let state = JSON.parse(JSON.stringify(INITIAL_STATE));

function formatCOP(val) {
  return '$' + Number(val || 0).toLocaleString('es-CO');
}

function showToast(msg) {
  const toast = document.getElementById('app-toast');
  const text = document.getElementById('app-toast-text');
  if (!toast || !text) return;
  text.textContent = msg;
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3200);
}

// Navigation
const SCREEN_META = {
  hu01: { title: 'Gestión de Acceso, Seguridad JWT y Roles (RBAC)', badge: 'HU-01 • Seguridad y Auditoría' },
  hu02: { title: 'Recepción de Bicicletas y Apertura de Órdenes (OST)', badge: 'HU-02 • Recepción Técnica' },
  hu03: { title: 'Tablero de Taller y Consumo Atómico de Repuestos', badge: 'HU-03 • Control de Taller' },
  hu04: { title: 'Catálogo de Ciclismo, Inventario y Kardex Inmutable', badge: 'HU-04 • Inventario y Kardex' },
  hu05: { title: 'Proveedores de Ciclismo y Órdenes de Compra', badge: 'HU-05 • Abastecimiento' },
  hu06: { title: 'Liquidación POS, Cálculo Fiscal Interno y Pagos', badge: 'HU-06 • Punto de Venta y Caja' },
  hu07: { title: 'Tablero Analítico de Gestión y Reportes (PDF/CSV)', badge: 'HU-07 • Analítica y KPIs' }
};

function switchScreen(screenId) {
  if (!SCREEN_META[screenId]) screenId = 'hu01';
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  const targetSection = document.getElementById('view-' + screenId);
  const targetBtn = document.querySelector(`.nav-btn[data-screen="${screenId}"]`);
  if (targetSection) targetSection.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');

  document.getElementById('topbar-title').textContent = SCREEN_META[screenId].title;
  document.getElementById('topbar-badge').textContent = SCREEN_META[screenId].badge;
}

// Render functions
function renderAll() {
  renderTopbarRole();
  renderHU01();
  renderHU02();
  renderHU03();
  renderHU04();
  renderHU05();
  renderHU06();
  renderHU07();
}

function renderTopbarRole() {
  const roleObj = state.roles[state.currentRole];
  const select = document.getElementById('role-switcher');
  if (select) select.value = state.currentRole;
  const tokenEl = document.getElementById('jwt-token-label');
  if (tokenEl) tokenEl.textContent = `Sesión Activa: ${roleObj.code} (${roleObj.token})`;
}

function changeRole(newRole) {
  if (!state.roles[newRole]) return;
  state.currentRole = newRole;
  state.auditLogs.unshift({
    id: 'AUD-' + (900 + state.auditLogs.length + 1),
    timestamp: '2026-11-08 16:20:05',
    user: state.roles[newRole].name,
    action: `Cambio de contexto RBAC a rol ${newRole}`,
    module: 'Seguridad (HU-01)',
    result: 'Token Renovado'
  });
  renderAll();
  showToast(`Rol cambiado a: ${state.roles[newRole].name}`);
}

// HU-01: RBAC & Audit
function renderHU01() {
  const roleObj = state.roles[state.currentRole];
  const activeRoleName = document.getElementById('hu01-active-role');
  if (activeRoleName) activeRoleName.textContent = roleObj.name;

  const auditBody = document.getElementById('hu01-audit-tbody');
  if (auditBody) {
    auditBody.innerHTML = state.auditLogs.map(log => {
      const isDenied = log.result.includes('Denegado');
      return `
        <tr>
          <td><strong>${log.id}</strong></td>
          <td>${log.timestamp}</td>
          <td>${log.user}</td>
          <td>${log.module}</td>
          <td>${log.action}</td>
          <td><span class="badge ${isDenied ? 'badge-danger' : 'badge-success'}">${log.result}</span></td>
        </tr>
      `;
    }).join('');
  }
}

// HU-02: Recepción de Bicicletas y OST
function renderHU02() {
  const filterVal = (document.getElementById('hu02-search')?.value || '').toLowerCase();
  const tbody = document.getElementById('hu02-ost-tbody');
  if (!tbody) return;

  const filtered = state.serviceOrders.filter(o =>
    o.id.toLowerCase().includes(filterVal) ||
    o.clientName.toLowerCase().includes(filterVal) ||
    o.bikeBrand.toLowerCase().includes(filterVal) ||
    o.bikeSerial.toLowerCase().includes(filterVal) ||
    o.status.toLowerCase().includes(filterVal)
  );

  tbody.innerHTML = filtered.map(o => {
    let badgeClass = 'badge-info';
    if (o.status === 'Lista para Entrega') badgeClass = 'badge-success';
    else if (o.status === 'En Reparación') badgeClass = 'badge-warning';
    else if (o.status === 'En Diagnóstico') badgeClass = 'badge-purple';
    else if (o.status === 'Entregada') badgeClass = 'badge-neutral';

    const partsSubtotal = o.parts.reduce((acc, p) => acc + p.qty * p.unitPrice, 0);
    return `
      <tr>
        <td><strong>${o.id}</strong><br><span style="font-size:11px;color:#64748b">${o.date}</span></td>
        <td><strong>${o.clientName}</strong><br><span style="font-size:11px;color:#64748b">${o.clientPhone}</span></td>
        <td><strong>${o.bikeBrand}</strong> (${o.bikeType})<br><span style="font-size:11px;color:#0f172a">Serial: <code>${o.bikeSerial}</code></span></td>
        <td>${o.serviceType}</td>
        <td>${o.mechanic}</td>
        <td><span class="badge ${badgeClass}">${o.status}</span></td>
        <td><strong>${formatCOP(o.laborCost + partsSubtotal)}</strong></td>
      </tr>
    `;
  }).join('');
}

function createServiceOrder(e) {
  e.preventDefault();
  const clientName = document.getElementById('ost-client').value.trim();
  const clientPhone = document.getElementById('ost-phone').value.trim();
  const bikeBrand = document.getElementById('ost-bike').value.trim();
  const bikeType = document.getElementById('ost-type').value;
  const bikeSerial = document.getElementById('ost-serial').value.trim().toUpperCase();
  const serviceType = document.getElementById('ost-service').value;
  const mechanic = document.getElementById('ost-mechanic').value;
  const laborCost = Number(document.getElementById('ost-labor').value) || 65000;
  const diagnosis = document.getElementById('ost-diag').value.trim();

  if (!clientName || !clientPhone || !bikeBrand || !bikeSerial || !diagnosis) {
    showToast('Complete todos los campos obligatorios de la bicicleta y cliente.');
    return;
  }

  const newId = `OST-2026-0${101 + state.serviceOrders.length}`;
  state.serviceOrders.unshift({
    id: newId,
    date: '2026-11-08 16:25',
    deliveryDate: '2026-11-09 17:00',
    clientName,
    clientDoc: 'CC Registrada',
    clientPhone,
    bikeBrand,
    bikeType,
    bikeSerial,
    bikeColor: 'Registrado en ingreso',
    serviceType,
    mechanic,
    status: 'Recibida',
    diagnosis,
    checklist: { frenos: false, transmision: false, rodamientos: false, centradoRines: false, torqueSeguridad: false },
    laborCost,
    parts: []
  });

  state.selectedOstId = newId;
  renderAll();
  e.target.reset();
  showToast(`Orden de Servicio ${newId} creada exitosamente.`);
}

// HU-03: Taller & Asignación de Repuestos
function renderHU03() {
  const statuses = ['Recibida', 'En Diagnóstico', 'En Reparación', 'Lista para Entrega'];
  statuses.forEach((st, idx) => {
    const colEl = document.getElementById(`kanban-col-${idx}`);
    const countEl = document.getElementById(`kanban-count-${idx}`);
    if (!colEl) return;
    const items = state.serviceOrders.filter(o => o.status === st);
    if (countEl) countEl.textContent = items.length;
    colEl.innerHTML = items.map(o => `
      <div class="kanban-card ${state.selectedOstId === o.id ? 'selected' : ''}" onclick="selectOstForWorkshop('${o.id}')">
        <div class="kanban-ost-id">${o.id} • ${o.bikeType}</div>
        <div class="kanban-bike">${o.bikeBrand}</div>
        <div class="kanban-meta">Cliente: ${o.clientName}</div>
        <div class="kanban-meta">Técnico: <strong>${o.mechanic}</strong></div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;align-items:center;">
          <span class="badge badge-info">${o.parts.length} repuestos</span>
          <span style="font-size:11px;font-weight:700;">${formatCOP(o.laborCost + o.parts.reduce((a,b)=>a+b.qty*b.unitPrice,0))}</span>
        </div>
      </div>
    `).join('');
  });

  const ost = state.serviceOrders.find(o => o.id === state.selectedOstId) || state.serviceOrders[0];
  if (!ost) return;

  const detailBox = document.getElementById('hu03-ost-detail');
  if (detailBox) {
    const partsTotal = ost.parts.reduce((acc, p) => acc + p.qty * p.unitPrice, 0);
    detailBox.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
        <div>
          <span class="badge badge-info" style="margin-bottom:4px;">Orden Seleccionada: ${ost.id}</span>
          <h4 style="font-size:15px;font-weight:800;">${ost.bikeBrand} (${ost.bikeType}) — Serial: ${ost.bikeSerial}</h4>
          <p style="font-size:12px;color:#475569;">Cliente: <strong>${ost.clientName}</strong> (${ost.clientPhone}) | Mecánico: <strong>${ost.mechanic}</strong></p>
        </div>
        <div style="display:flex;gap:6px;">
          <select id="hu03-status-select" class="form-control" style="width:175px;font-weight:700;" onchange="updateOstStatus('${ost.id}', this.value)">
            ${['Recibida', 'En Diagnóstico', 'En Reparación', 'Lista para Entrega', 'Entregada'].map(s => `<option value="${s}" ${ost.status === s ? 'selected' : ''}>Estado: ${s}</option>`).join('')}
          </select>
        </div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;margin-bottom:12px;font-size:12px;">
        <strong>Diagnóstico Técnico e Inspección:</strong> ${ost.diagnosis}
        <div style="margin-top:8px;display:flex;gap:12px;flex-wrap:wrap;">
          <label><input type="checkbox" ${ost.checklist.frenos ? 'checked' : ''} onchange="toggleCheck('${ost.id}','frenos')"> Calibración Frenos</label>
          <label><input type="checkbox" ${ost.checklist.transmision ? 'checked' : ''} onchange="toggleCheck('${ost.id}','transmision')"> Sincronización Transmisión</label>
          <label><input type="checkbox" ${ost.checklist.rodamientos ? 'checked' : ''} onchange="toggleCheck('${ost.id}','rodamientos')"> Engrase Rodamientos</label>
          <label><input type="checkbox" ${ost.checklist.centradoRines ? 'checked' : ''} onchange="toggleCheck('${ost.id}','centradoRines')"> Centrado Rines</label>
          <label><input type="checkbox" ${ost.checklist.torqueSeguridad ? 'checked' : ''} onchange="toggleCheck('${ost.id}','torqueSeguridad')"> Torque con Torquímetro</label>
        </div>
      </div>
      <table class="data-table" style="margin-bottom:10px;">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Repuesto / Insumo Instalado en Bicicleta</th>
            <th>Cant.</th>
            <th>Precio Unit.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${ost.parts.map(p => `
            <tr>
              <td><code>${p.sku}</code></td>
              <td><strong>${p.name}</strong></td>
              <td>${p.qty}</td>
              <td>${formatCOP(p.unitPrice)}</td>
              <td><strong>${formatCOP(p.qty * p.unitPrice)}</strong></td>
            </tr>
          `).join('')}
          <tr style="background:#eff6ff;">
            <td colspan="4"><strong>Mano de Obra Especializada (${ost.serviceType})</strong></td>
            <td><strong>${formatCOP(ost.laborCost)}</strong></td>
          </tr>
          <tr style="background:#ecfdf5;">
            <td colspan="4"><strong>TOTAL ACUMULADO ORDEN DE SERVICIO (Antes de IVA)</strong></td>
            <td><strong style="color:#059669;font-size:13.5px;">${formatCOP(ost.laborCost + partsTotal)}</strong></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  const partSelect = document.getElementById('hu03-part-select');
  if (partSelect) {
    partSelect.innerHTML = state.inventory.map(item =>
      `<option value="${item.sku}">${item.sku} - ${item.name} (Stock disp: ${item.stock} | ${formatCOP(item.price)})</option>`
    ).join('');
  }
}

function selectOstForWorkshop(ostId) {
  state.selectedOstId = ostId;
  renderHU03();
}

function updateOstStatus(ostId, newStatus) {
  const ost = state.serviceOrders.find(o => o.id === ostId);
  if (!ost) return;
  ost.status = newStatus;
  renderAll();
  showToast(`Estado de ${ostId} actualizado a: ${newStatus}`);
}

function toggleCheck(ostId, field) {
  const ost = state.serviceOrders.find(o => o.id === ostId);
  if (!ost) return;
  ost.checklist[field] = !ost.checklist[field];
}

function assignPartToOst(e) {
  e.preventDefault();
  const sku = document.getElementById('hu03-part-select').value;
  const qty = Number(document.getElementById('hu03-part-qty').value) || 1;
  const ost = state.serviceOrders.find(o => o.id === state.selectedOstId);
  const invItem = state.inventory.find(i => i.sku === sku);

  if (!ost || !invItem) return;

  if (qty <= 0 || invItem.stock < qty) {
    showToast(`BLOQUEO ACID: Stock insuficiente para ${invItem.name} (Disponible: ${invItem.stock}).`);
    return;
  }

  const prevStock = invItem.stock;
  invItem.stock -= qty;

  const existing = ost.parts.find(p => p.sku === sku);
  if (existing) {
    existing.qty += qty;
  } else {
    ost.parts.push({ sku: invItem.sku, name: invItem.name, qty, unitPrice: invItem.price });
  }

  state.kardex.unshift({
    id: 'KDX-' + (410 + state.kardex.length),
    date: '2026-11-08 16:28',
    sku: invItem.sku,
    item: invItem.name,
    type: 'SALIDA TALLER',
    ref: ost.id,
    prevStock,
    delta: -qty,
    newStock: invItem.stock,
    unitCost: invItem.avgCost,
    user: state.roles[state.currentRole].name.split('(')[0].trim()
  });

  renderAll();
  showToast(`Repuesto ${sku} (x${qty}) imputado a ${ost.id} y descontado del Kardex.`);
}

// HU-04: Catálogo de Repuestos e Inventario + Kardex
function renderHU04() {
  const invTbody = document.getElementById('hu04-inv-tbody');
  if (invTbody) {
    invTbody.innerHTML = state.inventory.map(item => {
      let statusBadge = '<span class="badge badge-success">Óptimo</span>';
      if (item.stock < item.minStock) {
        statusBadge = '<span class="badge badge-danger">Crítico • Reabastecer</span>';
      } else if (item.stock === item.minStock) {
        statusBadge = '<span class="badge badge-warning">Alerta Stock Mínimo</span>';
      }

      return `
        <tr>
          <td><code>${item.sku}</code></td>
          <td><strong>${item.name}</strong><br><span style="font-size:11px;color:#64748b">Marca: ${item.brand} • Ubicación: ${item.location}</span></td>
          <td>${item.category}</td>
          <td>${formatCOP(item.avgCost)}</td>
          <td><strong>${formatCOP(item.price)}</strong></td>
          <td><strong style="font-size:13.5px;">${item.stock}</strong> / <span style="color:#64748b">${item.minStock} mín</span></td>
          <td>${statusBadge}</td>
        </tr>
      `;
    }).join('');
  }

  const kdxTbody = document.getElementById('hu04-kardex-tbody');
  if (kdxTbody) {
    kdxTbody.innerHTML = state.kardex.map(k => {
      let badge = 'badge-info';
      if (k.type.includes('ENTRADA')) badge = 'badge-success';
      else if (k.type.includes('SALIDA')) badge = 'badge-warning';
      else if (k.type.includes('AJUSTE')) badge = 'badge-purple';

      return `
        <tr>
          <td><strong>${k.id}</strong></td>
          <td>${k.date}</td>
          <td><code>${k.sku}</code> — ${k.item}</td>
          <td><span class="badge ${badge}">${k.type}</span></td>
          <td><strong>${k.ref}</strong></td>
          <td>${k.prevStock}</td>
          <td><strong style="color:${k.delta > 0 ? '#059669' : '#e11d48'}">${k.delta > 0 ? '+' + k.delta : k.delta}</strong></td>
          <td><strong>${k.newStock}</strong></td>
          <td>${formatCOP(k.unitCost)}</td>
          <td>${k.user}</td>
        </tr>
      `;
    }).join('');
  }
}

// HU-05: Proveedores y Órdenes de Compra
function renderHU05() {
  const poTbody = document.getElementById('hu05-po-tbody');
  if (!poTbody) return;

  poTbody.innerHTML = state.purchaseOrders.map(po => {
    let badge = 'badge-info';
    if (po.status === 'Recibida en Bodega') badge = 'badge-success';
    else if (po.status.includes('Emitida')) badge = 'badge-warning';
    else badge = 'badge-neutral';

    const itemsDesc = po.items.map(i => `${i.name} (x${i.qty})`).join(', ');
    const canReceive = po.status !== 'Recibida en Bodega';

    return `
      <tr>
        <td><strong>${po.id}</strong><br><span style="font-size:11px;color:#64748b">${po.date}</span></td>
        <td><strong>${po.supplier}</strong><br><span style="font-size:11px;color:#64748b">NIT: ${po.nit}</span></td>
        <td>${itemsDesc}</td>
        <td><strong>${formatCOP(po.total)}</strong></td>
        <td><span class="badge ${badge}">${po.status}</span></td>
        <td>
          ${canReceive
            ? `<button class="btn btn-emerald btn-sm" onclick="receivePurchaseOrder('${po.id}')">Recibir Mercancía</button>`
            : `<span style="font-size:11px;color:#059669;font-weight:700;">✓ Ingresada al Kardex</span>`}
        </td>
      </tr>
    `;
  }).join('');
}

function receivePurchaseOrder(poId) {
  const po = state.purchaseOrders.find(p => p.id === poId);
  if (!po || po.status === 'Recibida en Bodega') return;
  po.status = 'Recibida en Bodega';

  po.items.forEach(item => {
    const inv = state.inventory.find(i => i.sku === item.sku);
    if (inv) {
      const prev = inv.stock;
      inv.stock += item.qty;
      state.kardex.unshift({
        id: 'KDX-' + (410 + state.kardex.length),
        date: '2026-11-08 16:30',
        sku: inv.sku,
        item: inv.name,
        type: 'ENTRADA COMPRA',
        ref: po.id,
        prevStock: prev,
        delta: +item.qty,
        newStock: inv.stock,
        unitCost: item.unitCost,
        user: state.roles[state.currentRole].name.split('(')[0].trim()
      });
    }
  });

  renderAll();
  showToast(`Orden ${poId} recibida en bodega. Stock y Kardex actualizados.`);
}

// HU-06: POS & Liquidación con Cálculo Fiscal Interno
function renderHU06() {
  const ost = state.serviceOrders.find(o => o.id === state.selectedPosOstId) || state.serviceOrders[0];
  if (!ost) return;

  const subtotalParts = ost.parts.reduce((acc, p) => acc + p.qty * p.unitPrice, 0);
  const subtotalLabor = ost.laborCost;
  const discountPct = Number(document.getElementById('pos-discount-pct')?.value || 0);
  const grossSubtotal = subtotalParts + subtotalLabor;
  const discountVal = Math.round(grossSubtotal * (discountPct / 100));
  const taxableBase = grossSubtotal - discountVal;
  const ivaVal = Math.round(taxableBase * 0.19);
  const grandTotal = taxableBase + ivaVal;

  const receiptBox = document.getElementById('hu06-receipt-preview');
  if (receiptBox) {
    receiptBox.innerHTML = `
      <div class="receipt-header">
        <div style="font-size:14px;font-weight:800;">CICLOTALLER PRO • SGIP-BIKETECH</div>
        <div>NIT 901.584.210-4 • Régimen Ordinario (IVA 19%)</div>
        <div>Comprobante Interno de Servicio Técnico y Venta POS</div>
        <div style="font-size:10.5px;color:#475569;margin-top:2px;">Orden Asociada: <strong>${ost.id}</strong> | Bicicleta: ${ost.bikeBrand} (${ost.bikeSerial})</div>
      </div>
      <div class="receipt-row"><span>Cliente:</span><strong>${ost.clientName} (${ost.clientDoc})</strong></div>
      <div class="receipt-row"><span>Técnico Responsable:</span><span>${ost.mechanic}</span></div>
      <hr style="border:none;border-top:1px dashed #cbd5e1;margin:6px 0;">
      ${ost.parts.map(p => `
        <div class="receipt-row">
          <span>${p.qty}x ${p.name.substring(0, 32)}</span>
          <span>${formatCOP(p.qty * p.unitPrice)}</span>
        </div>
      `).join('')}
      <div class="receipt-row">
        <span>1x Mano de Obra (${ost.serviceType.substring(0, 28)})</span>
        <span>${formatCOP(subtotalLabor)}</span>
      </div>
      <hr style="border:none;border-top:1px dashed #cbd5e1;margin:6px 0;">
      <div class="receipt-row"><span>Subtotal Repuestos e Insumos:</span><span>${formatCOP(subtotalParts)}</span></div>
      <div class="receipt-row"><span>Subtotal Mano de Obra Técnica:</span><span>${formatCOP(subtotalLabor)}</span></div>
      <div class="receipt-row"><span>Descuento Comercial (${discountPct}%):</span><span>-${formatCOP(discountVal)}</span></div>
      <div class="receipt-row"><span>Base Gravable Interna:</span><span>${formatCOP(taxableBase)}</span></div>
      <div class="receipt-row" style="color:#1e3a8a;font-weight:700;"><span>Impuesto Calculado Internamente (IVA 19%):</span><span>${formatCOP(ivaVal)}</span></div>
      <div class="receipt-row receipt-total"><span>TOTAL A PAGAR EN MOSTRADOR:</span><span>${formatCOP(grandTotal)}</span></div>
      <div style="margin-top:8px;font-size:10.5px;color:#475569;text-align:center;">
        * Documento operativo interno con cálculo fiscal local. Exportable en JSON/XML para software contable externo (Sin transmisión directa DIAN en Fase 1).
      </div>
    `;
  }

  const posHistTbody = document.getElementById('hu06-pos-tbody');
  if (posHistTbody) {
    posHistTbody.innerHTML = state.posTransactions.map(tx => `
      <tr>
        <td><strong>${tx.id}</strong><br><span style="font-size:11px;color:#64748b">${tx.date}</span></td>
        <td><code>${tx.ostRef}</code> — ${tx.client}</td>
        <td>${formatCOP(tx.subtotalParts)}</td>
        <td>${formatCOP(tx.subtotalLabor)}</td>
        <td><strong>${formatCOP(tx.ivaInternal)}</strong></td>
        <td><strong style="color:#059669;">${formatCOP(tx.totalPaid)}</strong></td>
        <td><span class="badge badge-info">${tx.paymentMethod}</span></td>
      </tr>
    `).join('');
  }
}

function registerInternalPayment(e) {
  e.preventDefault();
  const ost = state.serviceOrders.find(o => o.id === state.selectedPosOstId) || state.serviceOrders[0];
  if (!ost) return;

  const paymentMethod = document.getElementById('pos-payment-method').value;
  const discountPct = Number(document.getElementById('pos-discount-pct')?.value || 0);
  const subtotalParts = ost.parts.reduce((acc, p) => acc + p.qty * p.unitPrice, 0);
  const subtotalLabor = ost.laborCost;
  const gross = subtotalParts + subtotalLabor;
  const discountVal = Math.round(gross * (discountPct / 100));
  const base = gross - discountVal;
  const ivaInternal = Math.round(base * 0.19);
  const totalPaid = base + ivaInternal;

  ost.status = 'Entregada';
  const txId = `POS-2026-0${882 + state.posTransactions.length}`;
  state.posTransactions.unshift({
    id: txId,
    date: '2026-11-08 16:35',
    ostRef: ost.id,
    client: ost.clientName,
    subtotalParts,
    subtotalLabor,
    discount: discountVal,
    ivaInternal,
    totalPaid,
    paymentMethod,
    cashier: state.roles[state.currentRole].name.split('(')[0].trim()
  });

  renderAll();
  showToast(`Pago interno registrado (${txId}) por ${formatCOP(totalPaid)}. Orden ${ost.id} cerrada.`);
}

// HU-07: Dashboard Analítico & Reportes
function renderHU07() {
  const totalInvValue = state.inventory.reduce((acc, i) => acc + i.stock * i.avgCost, 0);
  const criticalCount = state.inventory.filter(i => i.stock <= i.minStock).length;
  const elInvVal = document.getElementById('hu07-inv-val');
  if (elInvVal) elInvVal.textContent = formatCOP(totalInvValue);
  const elCrit = document.getElementById('hu07-crit-count');
  if (elCrit) elCrit.textContent = `${criticalCount} SKUs en alerta`;
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  renderAll();
  const params = new URLSearchParams(window.location.search);
  const screenParam = params.get('screen');
  if (screenParam && SCREEN_META[screenParam]) {
    switchScreen(screenParam);
  } else {
    switchScreen('hu01');
  }
});
