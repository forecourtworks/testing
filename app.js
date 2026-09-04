/**
 * FORECOURT WORKS LIMITED – Technical Service Work Order App
 * Progressive web form with auto-population, GPS, camera, signatures & PDF export
 */

(function () {
  'use strict';

  // ---------- State ----------
  const state = {
    currentStep: 0,
    totalSteps: 10,
    photos: [],          // {id, dataUrl, name}
    signatures: {},      // canvas id → dataUrl
    autoPopulated: false,
    pdfBlob: null,
    pdfFileName: ''
  };
  // Expose for HQ submission module
  window.state = state;


  const LOGO_DATA_URL = 'data:image/png;base64,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';
  const sigPads = {};

  // ---------- Templates for auto-population ----------
  const TEMPLATES = {
    'Fuel Dispenser|Diagnosis & On-Site Corrective Repair + Calibration Verification': {
      hazards: [
        { hazard: 'Flammable fuel vapors / fire & explosion', risk: 'High', control: 'Continuous LEL monitoring; no ignition sources within 25 ft; fire extinguisher & spill kit staged; hot-work prohibited', verified: true },
        { hazard: 'Electrical energy (dispenser power)', risk: 'High', control: 'Lockout/Tagout of dispenser power supply; verified zero energy state before opening panels', verified: true },
        { hazard: 'Pressurized product lines', risk: 'Medium', control: 'Isolation of product supply where required; controlled depressurization; secondary containment monitored', verified: true },
        { hazard: 'Vehicle / public traffic on forecourt', risk: 'Medium', control: 'Work zone cones & barrier tape; high-visibility PPE; spotter during critical lifts', verified: true },
        { hazard: 'Manual handling / awkward postures', risk: 'Low-Med', control: 'Two-person lift for meter assembly; correct body mechanics; mechanical aids used where available', verified: true },
        { hazard: 'Slip / trip on wet or contaminated surfaces', risk: 'Medium', control: 'Immediate clean-up of any product; absorbent available; good housekeeping enforced', verified: true }
      ],
      safetyDeclaration: 'I confirm that the Job Hazard Analysis was completed, all identified controls were implemented, and the work area was verified safe before commencement of diagnostic and repair activities.',
      toolboxTime: '09:05',
      scopeSummary: 'The scope was limited to diagnosis of the reported volumetric over-issuance, identification of root cause, corrective action on the flowmetering system, post-repair calibration verification, and return of the dispenser to safe, accurate service. No additional work outside this scope was performed without client authorization.',
      scopeSteps: `1. Arrival briefing, site induction compliance, and completion of Job Hazard Analysis / Pre-Job Safety Checklist.
2. Isolation of electrical power and product supply to the dispenser under LOTO.
3. Visual and functional inspection of the diesel metering system, associated piping, filters, and electronic interfaces.
4. Quantitative verification of meter performance using approved volumetric proving / master meter methodology.
5. Diagnosis of root cause of the reported over-issuance.
6. Removal of the defective flowmeter assembly under controlled conditions.
7. Installation of new OEM-equivalent flowmeter, correct torque, seals, and orientation.
8. System reassembly, restoration of power and product, leak checks, and functional testing.
9. Post-repair calibration / accuracy verification to confirm performance within statutory and manufacturer tolerance.
10. Documentation of all findings, parts, test results, and recommendations; client handover.`,
      deliverables: `• Completed and signed Technical Service Work Order (this document)
• Photographic evidence of nameplate, as-found condition, removed component, installed component, and final condition
• Calibration / accuracy test results (before and after)
• Parts traceability records and warranty information
• Recommendations for ongoing reliability`,
      findingsArrival: 'The team arrived on site, reported to the Station Manager / Duty Supervisor, completed site induction requirements, and conducted a toolbox talk. The Job Hazard Analysis was completed and signed off. The dispenser was taken out of service, isolated under Lockout/Tagout, and a clear work zone was established.',
      findingsDiagnosis: 'Visual inspection revealed no external leakage at the meter or associated joints. The diesel filter was within service life and showed normal differential pressure. Electronic totalizer and pulser signals were present and coherent. A controlled volumetric accuracy test was performed using a certified prover / master meter method. Results confirmed the reported condition of volumetric over-issuance outside acceptable tolerance under Weights & Measures / metrology practice (typically ±0.25% to ±0.5% depending on jurisdiction and meter class).',
      findingsRootCause: 'Internal wear and loss of volumetric accuracy within the flowmeter measuring chamber was determined to be the primary cause. No evidence of unauthorized adjustment, electronic manipulation, or external interference was found. The meter had reached the end of its reliable service life for accurate fiscal measurement.',
      findingsAction: 'The existing flowmeter was carefully removed, tagged, and retained for client inspection if required. A new OEM-specification flowmeter was installed in accordance with manufacturer torque and orientation requirements. All sealing faces were cleaned and new seals fitted. The assembly was leak-tested under pressure. Electrical connections and pulser interface were verified. Power and product supply were restored under controlled conditions.',
      findingsVerification: 'After stabilization, a full series of accuracy tests was conducted across the normal operating flow range. The dispenser was confirmed to be operating within acceptable tolerance. Functional tests of the nozzle, interlock, emergency stop, and totalizer were satisfactory. The work area was restored to a clean and safe condition. The dispenser was formally returned to service after client representative acknowledgment.',
      qcIntro: 'All tests were performed using calibrated reference equipment traceable to national standards. Environmental conditions were within acceptable limits for metering work. Results are summarized below.',
      qcRows: [
        { test: 'Volumetric Accuracy – Diesel (mid flow)', asFound: '+0.60% over-issuance', asLeft: '+0.12% (within tolerance)', criterion: 'Typically ±0.25% to ±0.50%', result: 'PASS' },
        { test: 'Volumetric Accuracy – Diesel (low flow)', asFound: 'Consistent trend', asLeft: '+0.18%', criterion: 'Within applicable tolerance', result: 'PASS' },
        { test: 'Leak Test – Meter & Joints', asFound: 'No external leaks observed', asLeft: 'No leaks under pressure', criterion: 'Zero visible leakage', result: 'PASS' },
        { test: 'Pulser / Electronic Interface', asFound: 'Signal present & coherent', asLeft: 'Signal present & coherent', criterion: 'Stable, correct pulse count', result: 'PASS' },
        { test: 'Nozzle, Interlock & E-Stop Function', asFound: 'Functional', asLeft: 'Fully functional', criterion: 'Correct operation', result: 'PASS' },
        { test: 'Totalizer Continuity', asFound: 'Reading continuous', asLeft: 'Reading continuous & consistent', criterion: 'No loss of count', result: 'PASS' }
      ],
      qcConclusion: 'All critical quality control tests passed. The dispenser now meets the required accuracy and functional standards for safe return to commercial service. Calibration certificate / test record is retained in the job file and a copy is available to the client upon request.',
      parts: [
        { desc: 'Diesel Flowmeter Assembly (OEM-spec, compatible with Encore / equivalent platform) – complete with seals', qty: '1', status: 'New', vendor: 'Authorized Distributor', installDate: '', warrantyStart: '', warrantyEnd: '' },
        { desc: 'Meter seals / gasket kit (as required for installation)', qty: '1 set', status: 'New', vendor: 'Same as above', installDate: '', warrantyStart: '', warrantyEnd: '' }
      ],
      partsTrace: 'Removed flowmeter retained and tagged with Work Order number for client inspection or further analysis if required. New part serial number and batch details are recorded in the job file and on the photographic evidence pack. Warranty is subject to correct operation and exclusion of damage from misuse, contamination, or unauthorized adjustment.',
      recommendations: `1. Immediate: The dispenser has been returned to service within tolerance. Continue normal commercial operation.
2. Short-term (next 30–60 days): Monitor the newly installed meter for any drift or unusual noise/vibration. Report any anomaly immediately.
3. Preventive Maintenance: Include this dispenser in the next scheduled quarterly PM cycle. Particular attention should be paid to filter condition, pulser cleanliness, and verification of accuracy at least annually or as required by local Weights & Measures regulations.
4. Fleet-wide Opportunity: Consider a systematic accuracy audit of remaining diesel dispensers at this station and sister sites to identify any other meters approaching end-of-life accuracy limits. Proactive replacement prevents revenue loss from over-issuance and protects the client from under-delivery claims.
5. Record Keeping: This Work Order and associated calibration data should be retained in the site equipment history file for the life of the asset and for regulatory audit readiness.`,
      finalStatus: 'REPAIRED AND RETURNED TO SERVICE',
      finalStatusText: 'The diesel flowmeter has been successfully diagnosed, replaced, and verified. All quality control tests have been passed. The dispenser has been functionally tested, leak-checked, and is hereby declared REPAIRED AND RETURNED TO SERVICE in a safe, accurate, and commercially usable condition. The equipment is NOT locked out. It is released for normal customer fuelling operations under the supervision of the site operator.',
      techDeclaration: 'I, the undersigned Lead Technician, confirm that the work described herein was performed in accordance with the applicable Standard Operating Procedure, manufacturer guidelines, and all site safety requirements. All statements of fact are true and accurate to the best of my knowledge. The equipment has been left in a safe condition.',
      acceptanceText: `I, the undersigned authorized representative of the Client at this Station, acknowledge that:
• The work described in this Work Order has been explained to me.
• I have been given the opportunity to inspect the completed work and the photographic / test evidence.
• The dispenser has been returned to service in my presence (or with my knowledge).
• I accept the equipment back into operational control of the Station.
• Any outstanding recommendations have been noted for management attention.`
    }
  };

  // Generic fallback template
  const GENERIC = {
    hazards: [
      { hazard: 'Flammable fuel vapors / fire & explosion', risk: 'High', control: 'Continuous gas monitoring; ignition source control; fire extinguisher staged', verified: true },
      { hazard: 'Electrical energy', risk: 'High', control: 'LOTO applied and verified', verified: true },
      { hazard: 'Vehicle / public traffic', risk: 'Medium', control: 'Work zone barriers and high-visibility PPE', verified: true }
    ],
    safetyDeclaration: 'I confirm that the Job Hazard Analysis was completed and all controls were implemented before work commenced.',
    toolboxTime: '',
    scopeSummary: 'Scope limited to the work type selected and the equipment identified. All work performed under controlled conditions.',
    scopeSteps: '1. Site arrival, induction and toolbox talk.\n2. Isolation and LOTO where required.\n3. Diagnosis / inspection as applicable.\n4. Corrective or preventive actions.\n5. Testing and verification.\n6. Documentation and handover.',
    deliverables: '• Completed Work Order\n• Photos of work\n• Test / calibration results (if applicable)\n• Recommendations',
    findingsArrival: 'Team arrived, completed induction and toolbox talk. Work area established and equipment isolated as required.',
    findingsDiagnosis: 'Inspection and diagnosis performed as per applicable SOP.',
    findingsRootCause: 'Root cause determined from diagnostic findings.',
    findingsAction: 'Corrective / preventive actions completed.',
    findingsVerification: 'Functional and safety checks completed. Equipment returned to service or left in safe state as recorded.',
    qcIntro: 'Quality control checks performed with calibrated equipment where applicable.',
    qcRows: [
      { test: 'Visual / Functional Check', asFound: 'As found', asLeft: 'Satisfactory', criterion: 'Safe & functional', result: 'PASS' }
    ],
    qcConclusion: 'All required QC checks completed satisfactorily.',
    parts: [],
    partsTrace: 'Any removed components tagged and retained as required. New parts recorded with warranty information.',
    recommendations: '1. Continue normal operation.\n2. Include equipment in next scheduled PM cycle.\n3. Retain this Work Order in the site equipment history file.',
    finalStatus: 'REPAIRED AND RETURNED TO SERVICE',
    finalStatusText: 'Work completed. Equipment returned to service in a safe condition.',
    techDeclaration: 'I confirm the work was performed in accordance with applicable SOPs and safety requirements. The equipment has been left in a safe condition.',
    acceptanceText: `I acknowledge that:
• The work has been explained to me.
• I have had the opportunity to inspect the completed work.
• I accept the equipment back into operational control.
• Recommendations have been noted.`
  };

  // ---------- Helpers ----------
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function toast(msg, type = '') {
    const el = $('#toast');
    el.textContent = msg;
    el.className = 'toast show' + (type ? ' ' + type : '');
    setTimeout(() => el.classList.remove('show'), 3200);
  }

  function showOverlay(text) {
    $('#overlay-text').textContent = text || 'Please wait…';
    $('#overlay').classList.add('show');
  }
  function hideOverlay() {
    $('#overlay').classList.remove('show');
  }

  function generateWONumber() {
    const now = new Date();
    const y = now.getFullYear();
    const r = String(Math.floor(Math.random() * 9000) + 1000);
    return `WO-${y}-${r}`;
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function updateProgress() {
    const pct = ((state.currentStep + 1) / state.totalSteps) * 100;
    $('#progress-fill').style.width = pct + '%';
  }

  function showStep(n) {
    $$('.step-card').forEach(c => c.classList.remove('active'));
    const card = $(`#step-${n}`);
    if (card) card.classList.add('active');
    state.currentStep = n;
    updateProgress();
    $('#btn-prev').disabled = n === 0;
    $('#btn-next').style.display = n === 9 ? 'none' : 'inline-flex';
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------- GPS (precise → approximate → manual) ----------
  function applyCoords(lat, lon, accuracyM, sourceLabel) {
    const status = $('#gps-status');
    const acc = accuracyM != null ? ` ±${Math.round(accuracyM)} m` : '';
    status.textContent = `${sourceLabel}: ${lat.toFixed(6)}, ${lon.toFixed(6)}${acc}`;
    reverseGeocode(lat, lon);
  }

  async function reverseGeocode(lat, lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'en', 'User-Agent': 'ForecourtWorks-WorkOrder/1.0' } }
      );
      if (!res.ok) throw new Error('geocode HTTP ' + res.status);
      const data = await res.json();
      if (data && data.display_name) {
        $('#site-address').value = data.display_name;
        $('#site-address').classList.remove('field-error');
        toast('Address filled from GPS', 'success');
        return;
      }
      throw new Error('no display_name');
    } catch (e) {
      $('#site-address').value = `Lat ${lat.toFixed(6)}, Lon ${lon.toFixed(6)} (refine manually: Town, Main Highway, Street)`;
      toast('Coordinates captured. Refine address if needed.');
    }
  }

  function getGPS() {
    const status = $('#gps-status');
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation not supported. Enter address manually.';
      toast('GPS unavailable — type Town, Main Highway, Street', 'warning');
      $('#site-address').focus();
      return;
    }

    status.textContent = 'Requesting precise location…';
    const btn = $('#btn-gps');
    if (btn) btn.disabled = true;

    // Priority 1: high-accuracy (GPS / network + sensors)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (btn) btn.disabled = false;
        applyCoords(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy, 'Precise');
      },
      () => {
        // Priority 2: approximate (network / cell)
        status.textContent = 'Precise failed — trying approximate…';
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (btn) btn.disabled = false;
            applyCoords(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy, 'Approximate');
          },
          () => {
            if (btn) btn.disabled = false;
            status.textContent = 'Location unavailable. Enter Town, Main Highway, Street / Landmark.';
            toast('GPS failed — enter location manually', 'error');
            const ta = $('#site-address');
            if (ta && !ta.value.trim()) {
              ta.placeholder = 'Town, Main Highway, Street / Landmark';
              ta.focus();
            }
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  // ---------- Auto-populate ----------
  function getTemplateKey() {
    const cat = $('#equip-category').value;
    const wt = $('#work-type').value;
    return `${cat}|${wt}`;
  }

  function getTemplate() {
    const key = getTemplateKey();
    return TEMPLATES[key] || GENERIC;
  }

  function fillHazards(list) {
    const container = $('#hazards-container');
    container.innerHTML = '';
    list.forEach((h, i) => {
      const div = document.createElement('div');
      div.className = 'form-group';
      div.style.border = '1px solid var(--border)';
      div.style.padding = '10px';
      div.style.borderRadius = '8px';
      div.style.marginBottom = '8px';
      div.innerHTML = `
        <div class="row">
          <div class="form-group" style="margin:0">
            <label>Hazard</label>
            <input type="text" class="haz-hazard auto-filled" value="${escapeAttr(h.hazard)}" />
          </div>
          <div class="form-group" style="margin:0">
            <label>Risk</label>
            <select class="haz-risk auto-filled">
              <option ${h.risk==='High'?'selected':''}>High</option>
              <option ${h.risk==='Medium'?'selected':''}>Medium</option>
              <option ${h.risk==='Low-Med'?'selected':''}>Low-Med</option>
              <option ${h.risk==='Low'?'selected':''}>Low</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-top:8px;margin-bottom:0">
          <label>Control / Mitigation</label>
          <textarea class="haz-control auto-filled" rows="2">${escapeHtml(h.control)}</textarea>
        </div>
        <label class="check-item" style="margin-top:6px">
          <input type="checkbox" class="haz-verified" ${h.verified ? 'checked' : ''}> Verified
        </label>
      `;
      container.appendChild(div);
    });
  }

  function fillQC(rows) {
    const container = $('#qc-table-container');
    let html = `<table class="data-table"><thead><tr>
      <th>Test Description</th><th>As-Found</th><th>As-Left</th><th>Criterion</th><th>Result</th>
    </tr></thead><tbody>`;
    rows.forEach(r => {
      html += `<tr>
        <td><input class="qc-test auto-filled" value="${escapeAttr(r.test)}" /></td>
        <td><input class="qc-found auto-filled" value="${escapeAttr(r.asFound)}" /></td>
        <td><input class="qc-left auto-filled" value="${escapeAttr(r.asLeft)}" /></td>
        <td><input class="qc-crit auto-filled" value="${escapeAttr(r.criterion)}" /></td>
        <td>
          <select class="qc-result auto-filled">
            <option ${r.result==='PASS'?'selected':''}>PASS</option>
            <option ${r.result==='FAIL'?'selected':''}>FAIL</option>
            <option ${r.result==='N/A'?'selected':''}>N/A</option>
          </select>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function fillParts(parts) {
    const container = $('#parts-container');
    container.innerHTML = '';
    const today = todayISO();
    const oneYear = new Date();
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    const endDate = oneYear.toISOString().slice(0, 10);

    if (!parts.length) {
      container.innerHTML = '<p class="help">No parts auto-suggested. Add any parts used.</p>';
      return;
    }
    parts.forEach(p => {
      const div = document.createElement('div');
      div.style.border = '1px solid var(--border)';
      div.style.padding = '10px';
      div.style.borderRadius = '8px';
      div.style.marginBottom = '10px';
      div.innerHTML = `
        <div class="form-group"><label>Description</label>
          <input type="text" class="part-desc auto-filled" value="${escapeAttr(p.desc)}" /></div>
        <div class="row">
          <div class="form-group"><label>Qty</label>
            <input type="text" class="part-qty auto-filled" value="${escapeAttr(p.qty)}" /></div>
          <div class="form-group"><label>Status</label>
            <select class="part-status auto-filled">
              <option ${p.status==='New'?'selected':''}>New</option>
              <option ${p.status==='Reconditioned'?'selected':''}>Reconditioned</option>
              <option>Used</option>
            </select></div>
        </div>
        <div class="form-group"><label>Vendor / Source</label>
          <input type="text" class="part-vendor auto-filled" value="${escapeAttr(p.vendor)}" /></div>
        <div class="row">
          <div class="form-group"><label>Install Date</label>
            <input type="date" class="part-install auto-filled" value="${p.installDate || today}" /></div>
          <div class="form-group"><label>Warranty Start</label>
            <input type="date" class="part-wstart auto-filled" value="${p.warrantyStart || today}" /></div>
        </div>
        <div class="form-group"><label>Warranty End</label>
          <input type="date" class="part-wend auto-filled" value="${p.warrantyEnd || endDate}" /></div>
      `;
      container.appendChild(div);
    });
  }

  function escapeHtml(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function escapeAttr(s) {
    return String(s || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function runAutoPopulate() {
    // Validate compulsory basics first
    const required = [
      ['client-name', 'Client name'],
      ['site-name', 'Site / Station'],
      ['site-address', 'Site address'],
      ['equip-id', 'Equipment ID'],
      ['equip-category', 'Equipment category'],
      ['equip-desc', 'Equipment description'],
      ['work-type', 'Work type'],
      ['reported-problem', 'Reported problem'],
      ['work-date', 'Date of work'],
      ['tech-lead', 'Lead Technician']
    ];
    clearFieldErrors();
    for (const [id, label] of required) {
      const el = $(`#${id}`);
      if (!el || !String(el.value || '').trim()) {
        if (el) el.classList.add('field-error');
        toast(`Please complete: ${label}`, 'error');
        el && el.focus();
        return false;
      }
    }

    // Generate WO number if empty
    {
      let num = $('#wo-number').value.trim();
      if (!num) {
        num = generateWONumber();
        $('#wo-number').value = num;
      }
      $('#wo-number-display').textContent = num;
    }
    $('#wo-date-display').textContent = $('#doc-date').value || todayISO();
    $('#wo-status-display').textContent = $('#wo-status').value;

    const t = getTemplate();
    const workDate = $('#work-date').value || todayISO();

    // Part B
    fillHazards(t.hazards);
    $('#toolbox-time').value = t.toolboxTime || '';
    $('#safety-declaration').value = t.safetyDeclaration;

    // Part C
    $('#scope-summary').value = t.scopeSummary;
    $('#scope-steps').value = t.scopeSteps;
    $('#deliverables').value = t.deliverables;

    // Part D – inject reported problem into diagnosis if present
    let diagnosis = t.findingsDiagnosis;
    const problem = $('#reported-problem').value;
    if (problem && diagnosis.indexOf(problem) === -1) {
      diagnosis = diagnosis.replace(
        'reported condition of volumetric over-issuance',
        `reported condition: "${problem}"`
      );
    }
    $('#findings-arrival').value = t.findingsArrival;
    $('#findings-diagnosis').value = diagnosis;
    $('#findings-rootcause').value = t.findingsRootCause;
    $('#findings-action').value = t.findingsAction;
    $('#findings-verification').value = t.findingsVerification;

    // Part E
    $('#qc-intro').value = t.qcIntro;
    fillQC(t.qcRows);
    $('#qc-conclusion').value = t.qcConclusion;

    // Part F
    fillParts(t.parts);
    $('#parts-traceability').value = t.partsTrace;

    // Part G
    $('#recommendations').value = t.recommendations;

    // Part H
    $('#final-status').value = t.finalStatus;
    $('#final-status-text').value = t.finalStatusText;
    $('#tech-declaration').value = t.techDeclaration;

    // Part I
    $('#acceptance-text').value = t.acceptanceText;
    $('#sig-tech-name').value = $('#tech-lead').value;
    $('#sig-tech-date').value = workDate;
    $('#sig-client-date').value = workDate;

    state.autoPopulated = true;
    toast('Technical sections auto-populated. Review each step and Confirm.', 'success');
    showStep(1);
    return true;
  }

  // ---------- Photos (resize + compress to 200–500 KB, 1280×720 / 1920×1080 JPEG) ----------
  function compressImageFile(file, maxW, maxH, minKB, maxKB) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        // Pass non-image (e.g. PDF evidence) through unchanged
        const reader = new FileReader();
        reader.onload = (e) => resolve({ dataUrl: e.target.result, name: file.name, bytes: file.size });
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        const scale = Math.min(1, maxW / w, maxH / h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        // Target mid-band ~350 KB; binary search quality
        let qLow = 0.55, qHigh = 0.92, best = null;
        for (let i = 0; i < 8; i++) {
          const q = (qLow + qHigh) / 2;
          const dataUrl = canvas.toDataURL('image/jpeg', q);
          const bytes = Math.round((dataUrl.length - 23) * 0.75); // approx
          best = { dataUrl, name: file.name.replace(/\.[^.]+$/, '') + '.jpg', bytes };
          if (bytes > maxKB * 1024) qHigh = q;
          else if (bytes < minKB * 1024) qLow = q;
          else break;
        }
        resolve(best);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Image load failed'));
      };
      img.src = url;
    });
  }

  async function addPhotos(fileList) {
    for (const file of Array.from(fileList)) {
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') continue;
      try {
        // Prefer 1920×1080; fall to 1280×720 scale via max dims
        const result = await compressImageFile(file, 1920, 1080, 200, 500);
        const id = 'ph_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
        state.photos.push({ id, dataUrl: result.dataUrl, name: result.name, bytes: result.bytes });
        renderPhotos();
        const kb = Math.round((result.bytes || 0) / 1024);
        if (kb > 0) toast(`Photo added (${kb} KB)`, 'success');
      } catch (err) {
        toast('Could not process photo: ' + (err.message || 'error'), 'error');
      }
    }
  }

  function renderPhotos() {
    const grid = $('#photo-grid');
    grid.innerHTML = '';
    state.photos.forEach(p => {
      const div = document.createElement('div');
      div.className = 'photo-thumb';
      if (p.dataUrl.startsWith('data:image')) {
        div.innerHTML = `<img src="${p.dataUrl}" alt="${escapeAttr(p.name)}" /><button class="remove" data-id="${p.id}">×</button>`;
      } else {
        div.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:0.7rem;padding:4px;text-align:center;">${escapeHtml(p.name)}</div><button class="remove" data-id="${p.id}">×</button>`;
      }
      grid.appendChild(div);
    });
    grid.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', () => {
        state.photos = state.photos.filter(x => x.id !== btn.dataset.id);
        renderPhotos();
      });
    });
  }

  // ---------- Signatures ----------
  function initSignatures() {
    ['sig-tech', 'sig-assist', 'sig-client'].forEach(id => {
      const canvas = document.getElementById(id);
      if (!canvas) return;
      // Clear previous
      if (sigPads[id]) {
        try { sigPads[id].off(); } catch(e) {}
      }
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const w = canvas.offsetWidth || 300;
      const h = 150;
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(ratio, ratio);
      // White background for print
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      sigPads[id] = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255,255,255)',
        penColor: 'rgb(20,20,20)',
        minWidth: 1.2,
        maxWidth: 3.0
      });
    });
  }

  function clearSig(id) {
    if (sigPads[id]) sigPads[id].clear();
  }

  function getSigData(id) {
    // Target: 400×200 or 600×300, PNG transparency preferred, 10–50 KB
    const src = document.getElementById(id);
    const padEmpty = !sigPads[id] || sigPads[id].isEmpty();
    // Allow canvas that was drawn programmatically (builder preview) even if pad reports empty
    let hasPixels = false;
    if (src) {
      try {
        const ctx = src.getContext('2d');
        const data = ctx.getImageData(0, 0, Math.min(src.width, 80), Math.min(src.height, 40)).data;
        for (let i = 3; i < data.length; i += 4) { if (data[i] > 10) { hasPixels = true; break; } }
      } catch (e) {}
    }
    if (padEmpty && !hasPixels) return null;
    try {
      if (!src) return sigPads[id] ? sigPads[id].toDataURL('image/png') : null;
      // Prefer 600×300; fall to 400×200 if source is small
      const targetW = src.width >= 500 ? 600 : 400;
      const targetH = src.width >= 500 ? 300 : 200;
      const out = document.createElement('canvas');
      out.width = targetW;
      out.height = targetH;
      const ctx = out.getContext('2d');
      // Transparent background for PNG
      ctx.clearRect(0, 0, targetW, targetH);
      // Scale source into target (contain)
      const scale = Math.min(targetW / src.width, targetH / src.height);
      const dw = Math.round(src.width * scale);
      const dh = Math.round(src.height * scale);
      const dx = Math.floor((targetW - dw) / 2);
      const dy = Math.floor((targetH - dh) / 2);
      ctx.drawImage(src, dx, dy, dw, dh);
      // PNG with transparency; if still large, fall back to JPEG white bg
      let dataUrl = out.toDataURL('image/png');
      const approxBytes = Math.round((dataUrl.length - 22) * 0.75);
      if (approxBytes > 50 * 1024) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(src, dx, dy, dw, dh);
        dataUrl = out.toDataURL('image/jpeg', 0.85);
      }
      return dataUrl;
    } catch (e) {
      try { return sigPads[id].toDataURL('image/png'); } catch (_) { return null; }
    }
  }


  window.__fswGetSigData = getSigData;

  // ---------- Validation for compulsory fields per step ----------
  function clearFieldErrors() {
    $$('.field-error').forEach(el => el.classList.remove('field-error'));
    $$('.field-warning').forEach(el => el.classList.remove('show'));
  }

  function markError(id, msg) {
    const el = $(`#${id}`);
    if (el) {
      el.classList.add('field-error');
      el.focus();
    }
    toast(msg || ('Required: ' + id), 'error');
  }

  function validateStep(step) {
    clearFieldErrors();
    if (step === 0) {
      // Mirror autofill required set so Next cannot bypass
      const required = [
        ['client-name', 'Client name is required'],
        ['site-name', 'Site / Station is required'],
        ['site-address', 'Site address is required (Town, Main Highway, Street)'],
        ['equip-id', 'Equipment ID is required'],
        ['equip-category', 'Equipment category is required'],
        ['equip-desc', 'Equipment description is required'],
        ['work-type', 'Work type is required'],
        ['reported-problem', 'Reported problem is required'],
        ['work-date', 'Date of work is required'],
        ['tech-lead', 'Lead Technician is required']
      ];
      for (const [id, msg] of required) {
        const el = $(`#${id}`);
        if (!el || !String(el.value || '').trim()) {
          markError(id, msg);
          return false;
        }
      }
      return true;
    }
    if (step === 7) {
      if (!$('#final-status').value) {
        markError('final-status', 'Select final equipment status before continuing');
        return false;
      }
    }
    if (step === 8) {
      if (sigPads['sig-tech'] && sigPads['sig-tech'].isEmpty()) {
        toast('Lead Technician signature is required', 'error');
        return false;
      }
      if (!$('#client-rep-name').value.trim()) {
        markError('client-rep-name', 'Site Representative name is required');
        return false;
      }
      if (sigPads['sig-client'] && sigPads['sig-client'].isEmpty()) {
        toast('Site Representative signature is required', 'error');
        return false;
      }
    }
    return true;
  }

  // ---------- Review summary ----------
  function buildReview() {
    const el = $('#review-summary');
    const wo = $('#wo-number').value;
    const client = $('#client-name').value;
    const site = $('#site-name').value;
    const equip = $('#equip-id').value + ' – ' + $('#equip-desc').value;
    const status = $('#final-status').value;
    el.innerHTML = `
      <div class="review-section"><h4>Header</h4>
        <div class="content"><strong>${wo}</strong> · ${$('#doc-date').value} · Status: ${$('#wo-status').value}</div></div>
      <div class="review-section"><h4>Client & Site</h4>
        <div class="content">${escapeHtml(client)} · ${escapeHtml(site)}<br/>${escapeHtml($('#site-address').value)}</div></div>
      <div class="review-section"><h4>Equipment</h4>
        <div class="content">${escapeHtml(equip)}<br/>Work: ${escapeHtml($('#work-type').value)}</div></div>
      <div class="review-section"><h4>Reported Problem</h4>
        <div class="content">${escapeHtml($('#reported-problem').value)}</div></div>
      <div class="review-section"><h4>Final Status</h4>
        <div class="content"><strong>${escapeHtml(status)}</strong></div></div>
      <div class="review-section"><h4>Technicians</h4>
        <div class="content">Lead: ${escapeHtml($('#tech-lead').value)}<br/>Assist: ${escapeHtml($('#tech-assist').value || '—')}</div></div>
      <div class="review-section"><h4>Photos attached</h4>
        <div class="content">${state.photos.length} file(s)</div></div>
      <div class="review-section"><h4>Signatures</h4>
        <div class="content">
          Tech: ${getSigData('sig-tech') ? '✓ Captured' : '✗ Missing'} ·
          Client: ${getSigData('sig-client') ? '✓ Captured' : '✗ Missing'}
        </div></div>
    `;
  }

  // ---------- PDF Generation ----------
  async function generatePDF() {
    showOverlay('Building professional PDF…');
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 14;
      let y = 12;

      const navy = [13, 71, 140];
      const accent = [217, 115, 13];
      const grey = [100, 100, 100];

      const outer = 7, inner = 9;
      function drawPageFrame() {
        doc.setDrawColor(...navy);
        doc.setLineWidth(0.55);
        doc.rect(outer, outer, pageW - outer * 2, 297 - outer * 2);
        doc.setLineWidth(0.25);
        doc.rect(inner, inner, pageW - inner * 2, 297 - inner * 2);
        // small logo page mark top-right
        try {
          doc.addImage(LOGO_DATA_URL, 'PNG', pageW - outer - 22, outer + 1, 18, 3.2);
        } catch (e) {}
      }
      function checkPage(need) {
        if (y + need > 275) {
          doc.addPage();
          drawPageFrame();
          y = 16;
        }
      }

      function sectionHeader(title) {
        checkPage(12);
        doc.setFillColor(...navy);
        doc.rect(margin, y, pageW - margin * 2, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(title, margin + 2, y + 4.8);
        y += 10;
        doc.setTextColor(30, 30, 30);
      }

      function labelValue(label, value, maxW) {
        checkPage(8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...grey);
        doc.text(label, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(20, 20, 20);
        const lines = doc.splitTextToSize(String(value || '—'), maxW || pageW - margin * 2 - 2);
        doc.text(lines, margin, y + 4);
        y += 4 + lines.length * 4 + 2;
      }

      drawPageFrame();
      // Header — white background for B&W print visibility (logo + address mandatory)
      // Expanded height for logo (top-left), address under logo, title top-right
      const headerH = 38;
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageW, headerH, 'F');
      // Accent rule under header
      doc.setFillColor(...accent);
      doc.rect(0, headerH, pageW, 1.2, 'F');

      // Logo top-left (legible size for print)
      let logoDrawn = false;
      try {
        const logoW = 48;
        const logoH = 8.5;
        doc.addImage(LOGO_DATA_URL, 'PNG', margin, 3.5, logoW, logoH);
        logoDrawn = true;
      } catch (e) {
        logoDrawn = false;
      }
      if (!logoDrawn) {
        // Fallback text if logo fails
        doc.setTextColor(...navy);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('FORECOURT WORKS LIMITED', margin, 9);
      }

      // Address under logo (top-left) — mandatory print visibility
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.text('Ramco Court, Gate 3B, Bellevue, South C.', margin, 16.5);
      doc.text('Phone: +(254) 729-002-087  |  Email: dispatcher@forecourtworks.co.ke', margin, 20.5);
      doc.setFontSize(6.5);
      doc.setTextColor(...navy);
      doc.text('FORECOURT WORKS LIMITED', margin, 24.5);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(...navy);
      doc.text('Engineering Reliability into Every Forecourt', margin, 28);

      // Document title top-right — mandatory, prominent
      doc.setTextColor(...navy);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      // Draw as two explicit lines for reliable right-align and visibility
      doc.text('WORK ORDER COMPLETION', pageW - margin, 11, { align: 'right' });
      doc.text('& SIGN-OFF FORM', pageW - margin, 16, { align: 'right' });

      y = headerH + 5;

      // Meta
      doc.setFillColor(232, 238, 247);
      doc.rect(margin, y, pageW - margin * 2, 8, 'F');
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(`WO: ${$('#wo-number').value}`, margin + 2, y + 5.2);
      doc.text(`Date: ${$('#doc-date').value}`, margin + 55, y + 5.2);
      doc.setTextColor(...( $('#wo-status').value === 'COMPLETED' ? [26,115,70] : grey));
      doc.text(`Status: ${$('#wo-status').value}`, pageW - margin - 2, y + 5.2, { align: 'right' });
      y += 12;

      // PART A
      sectionHeader('PART A — JOB & EQUIPMENT PARTICULARS');
      labelValue('Client / Asset Owner', $('#client-name').value);
      labelValue('Site / Station', $('#site-name').value + '  |  Contact: ' + ($('#site-contact').value || '—'));
      labelValue('Site Address', $('#site-address').value);
      labelValue('Equipment', `${$('#equip-id').value} – ${$('#equip-desc').value}`);
      labelValue('Manufacturer / Model / Serial', `${$('#equip-mfr').value || '—'}  |  SN: ${$('#equip-serial').value || '—'}`);
      labelValue('Product / Location', `${$('#product-handled').value || '—'}  |  ${$('#equip-location').value || '—'}`);
      labelValue('Work Type', $('#work-type').value);
      labelValue('Reported Problem', $('#reported-problem').value);
      labelValue('Date & Times', `Work date: ${$('#work-date').value}  |  Arrival: ${$('#time-arrival').value || '—'}  |  Start: ${$('#time-start').value || '—'}  |  Complete: ${$('#time-complete').value || '—'}  |  Departure: ${$('#time-departure').value || '—'}`);
      labelValue('Technicians', `Lead: ${$('#tech-lead').value}  |  Assist: ${$('#tech-assist').value || '—'}`);

      // PART B
      sectionHeader('PART B — JOB HAZARD ANALYSIS & MITIGATION');
      const hazNodes = $$('#hazards-container > div');
      hazNodes.forEach((node, i) => {
        const h = node.querySelector('.haz-hazard')?.value || '';
        const r = node.querySelector('.haz-risk')?.value || '';
        const c = node.querySelector('.haz-control')?.value || '';
        const v = node.querySelector('.haz-verified')?.checked ? 'Yes' : 'No';
        checkPage(14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(`${i + 1}. ${h}  [${r}]  Verified: ${v}`, margin, y);
        y += 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        const clines = doc.splitTextToSize('Control: ' + c, pageW - margin * 2);
        doc.text(clines, margin, y);
        y += clines.length * 3.5 + 3;
      });
      labelValue('PPE Confirmed', Array.from($$('#ppe-list input:checked')).map(c => c.value).join(', ') || '—');
      labelValue('Toolbox Talk', $('#toolbox-time').value || '—');
      labelValue('Safety Declaration', $('#safety-declaration').value);

      // PART C
      sectionHeader('PART C — SCOPE OF WORK & DELIVERABLES');
      labelValue('Scope Summary', $('#scope-summary').value);
      labelValue('Scope Steps', $('#scope-steps').value);
      labelValue('Deliverables', $('#deliverables').value);

      // PART D
      sectionHeader('PART D — SUMMARY OF WORK DONE AND FINDINGS');
      labelValue('Arrival & Preparation', $('#findings-arrival').value);
      labelValue('As-Found & Diagnosis', $('#findings-diagnosis').value);
      labelValue('Root Cause', $('#findings-rootcause').value);
      labelValue('Corrective Action', $('#findings-action').value);
      labelValue('Post-Repair Verification', $('#findings-verification').value);

      // PART E
      sectionHeader('PART E — QUALITY CONTROL TESTS AND RESULTS');
      labelValue('Method', $('#qc-intro').value);
      const qcRows = $$('#qc-table-container tbody tr');
      qcRows.forEach(tr => {
        const cells = tr.querySelectorAll('input, select');
        const line = Array.from(cells).map(c => c.value).join('  |  ');
        checkPage(6);
        doc.setFontSize(7.5);
        const lines = doc.splitTextToSize(line, pageW - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 3.5 + 2;
      });
      labelValue('QC Conclusion', $('#qc-conclusion').value);

      // PART F
      sectionHeader('PART F — LIST OF SPARE PARTS USED');
      $$('#parts-container > div').forEach(node => {
        const desc = node.querySelector('.part-desc')?.value || '';
        const qty = node.querySelector('.part-qty')?.value || '';
        const st = node.querySelector('.part-status')?.value || '';
        const vend = node.querySelector('.part-vendor')?.value || '';
        const inst = node.querySelector('.part-install')?.value || '';
        const ws = node.querySelector('.part-wstart')?.value || '';
        const we = node.querySelector('.part-wend')?.value || '';
        labelValue('Part', `${desc}  |  Qty: ${qty}  |  ${st}  |  Vendor: ${vend}`);
        labelValue('Dates', `Installed: ${inst}  |  Warranty: ${ws} → ${we}`);
      });
      labelValue('Traceability', $('#parts-traceability').value);

      // PART G
      sectionHeader('PART G — TECHNICIAN\'S RECOMMENDATIONS');
      labelValue('Recommendations', $('#recommendations').value);

      // PART H
      sectionHeader('PART H — EQUIPMENT FINAL STATUS');
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(26, 115, 70);
      doc.setLineWidth(0.6);
      const statusText = $('#final-status-text').value;
      const stLines = doc.splitTextToSize(statusText, pageW - margin * 2 - 6);
      const boxH = stLines.length * 4 + 10;
      checkPage(boxH + 6);
      doc.roundedRect(margin, y, pageW - margin * 2, boxH, 2, 2, 'FD');
      doc.setTextColor(26, 115, 70);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text($('#final-status').value, margin + 3, y + 5);
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(stLines, margin + 3, y + 10);
      y += boxH + 6;
      labelValue('Technician Declaration', $('#tech-declaration').value);

      // Signatures
      sectionHeader('SIGNATURES');
      const techSig = getSigData('sig-tech');
      const clientSig = getSigData('sig-client');
      const assistSig = getSigData('sig-assist');

      checkPage(40);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('Lead Technician', margin, y);
      y += 3;
      if (techSig) {
        doc.addImage(techSig, 'JPEG', margin, y, 55, 18);
      } else {
        doc.setDrawColor(180);
        doc.rect(margin, y, 55, 18);
      }
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.text(`${$('#sig-tech-name').value || $('#tech-lead').value}  ·  ${$('#sig-tech-date').value}`, margin, y);
      y += 8;

      if (assistSig) {
        doc.setFont('helvetica', 'bold');
        doc.text('Assisting Technician', margin, y);
        y += 3;
        doc.addImage(assistSig, 'JPEG', margin, y, 55, 18);
        y += 22;
      }

      // PART I
      sectionHeader('PART I — SITE REPRESENTATIVE ACCEPTANCE');
      labelValue('Acknowledgement', $('#acceptance-text').value);
      labelValue('Representative', `${$('#client-rep-name').value}  ·  ${$('#client-rep-title').value || ''}`);
      checkPage(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('Signature', margin, y);
      y += 3;
      if (clientSig) {
        doc.addImage(clientSig, 'JPEG', margin, y, 55, 18);
      } else {
        doc.setDrawColor(180);
        doc.rect(margin, y, 55, 18);
      }
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.text(`Date/Time: ${$('#sig-client-date').value} ${$('#sig-client-time').value || ''}`, margin, y);
      y += 6;
      if ($('#client-comments').value) {
        labelValue('Comments', $('#client-comments').value);
      }

      // Closing
      checkPage(20);
      y += 4;
      doc.setFillColor(232, 238, 247);
      doc.roundedRect(margin, y, pageW - margin * 2, 18, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...navy);
      doc.text('FORECOURT WORKS LIMITED – Engineering Reliability into Every Forecourt', margin + 3, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(40, 40, 40);
      const close = 'This Work Order forms part of our formal documentation regime. Every intervention is executed under controlled procedures, documented in full, and subject to internal quality review.';
      doc.text(doc.splitTextToSize(close, pageW - margin * 2 - 6), margin + 3, y + 10);

      // Photographic evidence – fixed bounding box (object-fit: contain) + two-column layout
      // Left column ~90 mm photo container with max height; right column for caption / notes
      if (state.photos && state.photos.length) {
        sectionHeader('H  PHOTOGRAPHIC EVIDENCE');
        const photoColW = 90;          // fixed width for photo container (mm)
        const photoMaxH = 70;          // max height – landscape stays short, portrait fills to limit
        const gap = 6;
        const textColX = margin + photoColW + gap;
        const textColW = pageW - margin - textColX;

        for (let pi = 0; pi < state.photos.length; pi++) {
          const p = state.photos[pi];
          if (!p.dataUrl || !p.dataUrl.startsWith('data:image')) continue;
          checkPage(photoMaxH + 18);

          // Photo container border (fixed bounding box)
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.3);
          doc.rect(margin, y, photoColW, photoMaxH);

          // object-fit: contain – probe natural size, scale to fit fixed box without stretch
          try {
            const fmt = p.dataUrl.indexOf('image/png') >= 0 ? 'PNG' : 'JPEG';
            const nat = await new Promise((resolve) => {
              const im = new Image();
              im.onload = () => resolve({ w: im.naturalWidth || 1, h: im.naturalHeight || 1 });
              im.onerror = () => resolve({ w: 16, h: 9 });
              im.src = p.dataUrl;
            });
            const boxW = photoColW - 2;
            const boxH = photoMaxH - 2;
            const scale = Math.min(boxW / nat.w, boxH / nat.h);
            const drawW = Math.max(1, nat.w * scale);
            const drawH = Math.max(1, nat.h * scale);
            const ox = margin + 1 + (boxW - drawW) / 2;
            const oy = y + 1 + (boxH - drawH) / 2;
            doc.addImage(p.dataUrl, fmt, ox, oy, drawW, drawH, undefined, 'FAST');
          } catch (e1) {
            try {
              doc.addImage(p.dataUrl, 'JPEG', margin + 1, y + 1, photoColW - 2, 0);
            } catch (e2) {
              doc.setFontSize(8);
              doc.setTextColor(150, 150, 150);
              doc.text('[Image unavailable]', margin + 4, y + 12);
            }
          }

          // Right column: caption + meta
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(...navy);
          doc.text('Photo ' + (pi + 1), textColX, y + 6);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(40, 40, 40);
          const captionLines = doc.splitTextToSize(String(p.name || 'Evidence photo'), textColW);
          doc.text(captionLines, textColX, y + 12);
          if (p.bytes) {
            doc.setFontSize(7);
            doc.setTextColor(...grey);
            doc.text(Math.round(p.bytes / 1024) + ' KB  ·  compressed field capture', textColX, y + 12 + captionLines.length * 3.5 + 2);
          }
          doc.setFontSize(7);
          doc.setTextColor(...grey);
          doc.text('WO: ' + ($('#wo-number').value || ''), textColX, y + photoMaxH - 4);

          y += photoMaxH + 8;
        }
      }

      // Footer on every page — white background for B&W print visibility
      // Tagline moved from header to footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        // Ensure frame on every page (header page already has it)
        doc.setDrawColor(...navy);
        doc.setLineWidth(0.55);
        doc.rect(7, 7, pageW - 14, 297 - 14);
        doc.setLineWidth(0.25);
        doc.rect(9, 9, pageW - 18, 297 - 18);
        try {
          doc.addImage(LOGO_DATA_URL, 'PNG', pageW - 7 - 22, 8, 18, 3.2);
        } catch (e) {}
        // Footer band inside frame
        doc.setFillColor(255, 255, 255);
        doc.rect(10, 280, pageW - 20, 14, 'F');
        doc.setDrawColor(...navy);
        doc.setLineWidth(0.3);
        doc.line(margin, 281, pageW - margin, 281);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(...navy);
        doc.text('FSW | Technical Service Work Order – Completion & Sign-Off', margin, 285);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(5.5);
        doc.setTextColor(...grey);
        doc.text('CONFIDENTIAL – Client Use Only', pageW / 2, 285, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6);
        doc.setTextColor(...navy);
        doc.text(`Page ${i} of ${pageCount}`, pageW - margin, 285, { align: 'right' });
        doc.setFontSize(5.5);
        doc.text(`CONTROLLED DOCUMENT  |  ${$('#wo-number').value}  |  Rev 1.0`, margin, 289.5);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(5);
        doc.text('FORECOURT WORKS LIMITED – Engineering Reliability into Every Forecourt', pageW / 2, 293.5, { align: 'center' });
      }

      const fileName = `${$('#wo-number').value}_${($('#site-name').value || 'WorkOrder').replace(/\s+/g, '_')}.pdf`;
      state.pdfBlob = doc.output('blob');
      state.pdfFileName = fileName;

      // Trigger download
      doc.save(fileName);

      $('#btn-share').style.display = 'inline-flex';
      $('#pdf-status').textContent = `PDF generated: ${fileName}`;
      toast('PDF generated successfully', 'success');

      // Update status
      $('#wo-status').value = 'COMPLETED';
      $('#wo-status-display').textContent = 'COMPLETED';
    } catch (err) {
      console.error(err);
      toast('PDF generation failed: ' + err.message, 'error');
    } finally {
      hideOverlay();
    }
  }

  async function sharePDF() {
    if (!state.pdfBlob) {
      toast('Generate the PDF first', 'error');
      return;
    }
    const file = new File([state.pdfBlob], state.pdfFileName, { type: 'application/pdf' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: state.pdfFileName,
          text: `Technical Service Work Order – ${$('#wo-number').value}`,
          files: [file]
        });
      } catch (e) {
        if (e.name !== 'AbortError') fallbackShare(file);
      }
    } else {
      fallbackShare(file);
    }
  }

  function fallbackShare(file) {
    // Download again + open WhatsApp / mailto tips
    const url = URL.createObjectURL(state.pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.pdfFileName;
    a.click();
    toast('PDF downloaded. You can attach it in WhatsApp, Email or any app.');
  }

  // ---------- Local draft save ----------
  function saveDraft() {
    const data = {
      wo: $('#wo-number').value,
      fields: {}
    };
    $$('input, select, textarea').forEach(el => {
      if (el.id) data.fields[el.id] = el.type === 'checkbox' ? el.checked : el.value;
    });
    data.photos = state.photos;
    data.step = state.currentStep;
    try {
      localStorage.setItem('fw_wo_draft', JSON.stringify(data));
      toast('Draft saved on this device', 'success');
    } catch (e) {
      toast('Could not save draft (storage full?)', 'error');
    }
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem('fw_wo_draft');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.fields) {
        Object.entries(data.fields).forEach(([id, val]) => {
          const el = document.getElementById(id);
          if (!el) return;
          if (el.type === 'checkbox') el.checked = !!val;
          else el.value = val;
        });
      }
      if (data.wo) {
        $('#wo-number-display').textContent = data.wo;
      }
      if (data.photos) {
        state.photos = data.photos;
        renderPhotos();
      }
      toast('Draft restored', 'success');
    } catch (_) {}
  }

  // ---------- Init & Events ----------
  function init() {
    // Defaults
    $('#doc-date').value = todayISO();
    $('#work-date').value = todayISO();
    $('#wo-number').value = generateWONumber();
    $('#wo-number-display').textContent = $('#wo-number').value;
    $('#wo-date-display').textContent = todayISO();

    // GPS
    $('#btn-gps').addEventListener('click', getGPS);

    // Auto-fill
    $('#btn-autofill').addEventListener('click', runAutoPopulate);

    // Confirm buttons
    $$('[data-confirm]').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.confirm, 10);
        if (!validateStep(step)) return;
        showStep(step + 1);
        if (step + 1 === 9) buildReview();
      });
    });

    // Nav
    $('#btn-prev').addEventListener('click', () => {
      if (state.currentStep > 0) showStep(state.currentStep - 1);
    });
    $('#btn-next').addEventListener('click', () => {
      // On step 0 force autofill path
      if (state.currentStep === 0) {
        runAutoPopulate();
        return;
      }
      const next = state.currentStep + 1;
      if (!validateStep(state.currentStep)) return;
      showStep(next);
      if (next === 9) buildReview();
    });

    // Photos
    $('#photo-input').addEventListener('change', e => addPhotos(e.target.files));
    $('#file-input').addEventListener('change', e => addPhotos(e.target.files));

    // Clear sigs
    $$('[data-clear-sig]').forEach(btn => {
      btn.addEventListener('click', () => clearSig(btn.dataset.clearSig));
    });

    // PDF
    $('#btn-generate-pdf').addEventListener('click', generatePDF);
    $('#btn-share').addEventListener('click', sharePDF);
    $('#btn-save-draft').addEventListener('click', saveDraft);

    // Add hazard / qc / part
    $('#btn-add-hazard').addEventListener('click', () => {
      fillHazards([{ hazard: '', risk: 'Medium', control: '', verified: false },
        ...Array.from($$('#hazards-container .haz-hazard')).map((_, i) => {
          const node = $$('#hazards-container > div')[i];
          return {
            hazard: node.querySelector('.haz-hazard').value,
            risk: node.querySelector('.haz-risk').value,
            control: node.querySelector('.haz-control').value,
            verified: node.querySelector('.haz-verified').checked
          };
        })
      ]);
    });

    // Resize sig pads on orientation change
    window.addEventListener('resize', () => {
      // re-init only if empty to avoid wiping
    });

    // Init signature pads after layout
    setTimeout(initSignatures, 300);

    // Restore draft?
    loadDraft();
    showStep(0);
  }

  // Expose core functions for builder preview + external hooks
  window.showStep = showStep;
  window.runAutoPopulate = runAutoPopulate;
  window.buildReview = buildReview;
  window.generatePDF = generatePDF;
  window.getGPS = getGPS;
  window.validateStep = validateStep;
  window.__fswGetSigData = getSigData;
  window.initSignatures = initSignatures;
  window.renderPhotos = renderPhotos;
  window.sigPads = sigPads;
  window.toast = toast;
  window.fillHazards = typeof fillHazards === 'function' ? fillHazards : null;

  document.addEventListener('DOMContentLoaded', init);
})();


// ===== FIXES OVERRIDE =====
(function() {
  // Re-bind Add QC
  const btnQc = document.getElementById('btn-add-qc');
  if (btnQc) {
    btnQc.onclick = function() {
      const container = document.getElementById('qc-table-container');
      if (!container) return;
      let tbody = container.querySelector('tbody');
      if (!tbody) {
        container.innerHTML = `<table class="data-table"><thead><tr>
          <th>Test Description</th><th>As-Found</th><th>As-Left</th><th>Criterion</th><th>Result</th>
        </tr></thead><tbody></tbody></table>`;
        tbody = container.querySelector('tbody');
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input class="qc-test" value="" placeholder="Test name" /></td>
        <td><input class="qc-found" value="" /></td>
        <td><input class="qc-left" value="" /></td>
        <td><input class="qc-crit" value="" /></td>
        <td><select class="qc-result"><option>PASS</option><option>FAIL</option><option>N/A</option></select></td>`;
      tbody.appendChild(tr);
    };
  }

  // Re-bind Add Part
  const btnPart = document.getElementById('btn-add-part');
  if (btnPart) {
    btnPart.onclick = function() {
      const container = document.getElementById('parts-container');
      if (!container) return;
      const today = new Date().toISOString().slice(0,10);
      const end = new Date(); end.setFullYear(end.getFullYear()+1);
      const endDate = end.toISOString().slice(0,10);
      const div = document.createElement('div');
      div.className = 'item-card';
      div.innerHTML = `
        <div class="form-group"><label>Description</label>
          <input type="text" class="part-desc" value="" /></div>
        <div class="row">
          <div class="form-group"><label>Qty</label><input type="text" class="part-qty" value="1" /></div>
          <div class="form-group"><label>Status</label>
            <select class="part-status"><option>New</option><option>Reconditioned</option><option>Used</option></select></div>
        </div>
        <div class="form-group"><label>Vendor / Source</label>
          <input type="text" class="part-vendor" value="" /></div>
        <div class="row">
          <div class="form-group"><label>Install Date</label>
            <input type="date" class="part-install" value="${today}" /></div>
          <div class="form-group"><label>Warranty Start</label>
            <input type="date" class="part-wstart" value="${today}" /></div>
        </div>
        <div class="form-group"><label>Warranty End</label>
          <input type="date" class="part-wend" value="${endDate}" /></div>
        <button type="button" class="btn btn-outline btn-sm" onclick="this.parentElement.remove()">Remove</button>`;
      container.appendChild(div);
    };
  }

  // Force re-init signatures when step 8 is shown
  const origShowStep = window.showStep;
  // Hook into confirm buttons for step 7 -> 8
  document.querySelectorAll('[data-confirm="7"]').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        if (typeof initSignatures === 'function') initSignatures();
      }, 200);
    });
  });

  // Also re-init on DOM ready with delay
  setTimeout(() => {
    if (typeof initSignatures === 'function') initSignatures();
  }, 600);

  // Fix Save Draft to actually download a file
  const btnSave = document.getElementById('btn-save-draft');
  if (btnSave) {
    btnSave.onclick = function() {
      const data = { version: 1, savedAt: new Date().toISOString(), fields: {} };
      document.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.id) data.fields[el.id] = el.type === 'checkbox' ? el.checked : el.value;
      });
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (document.getElementById('wo-number')?.value || 'WorkOrder') + '_draft.json';
      a.click();
      URL.revokeObjectURL(a.href);
      if (typeof toast === 'function') toast('Draft downloaded to your device', 'success');
    };
  }

  // Signature export for HQ payload – constrained size (10–50 KB, 400×200 / 600×300)
  window.getSigDataSafe = function(id) {
    // Prefer the main getSigData if available on window
    if (typeof window.__fswGetSigData === 'function') {
      return window.__fswGetSigData(id);
    }
    const pad = (typeof sigPads !== 'undefined') ? sigPads[id] : null;
    if (!pad || pad.isEmpty()) return null;
    try {
      const canvas = document.getElementById(id);
      if (!canvas) return pad.toDataURL('image/png');
      const targetW = canvas.width >= 500 ? 600 : 400;
      const targetH = canvas.width >= 500 ? 300 : 200;
      const tmp = document.createElement('canvas');
      tmp.width = targetW;
      tmp.height = targetH;
      const ctx = tmp.getContext('2d');
      ctx.clearRect(0, 0, targetW, targetH);
      const scale = Math.min(targetW / canvas.width, targetH / canvas.height);
      const dw = Math.round(canvas.width * scale);
      const dh = Math.round(canvas.height * scale);
      ctx.drawImage(canvas, Math.floor((targetW - dw) / 2), Math.floor((targetH - dh) / 2), dw, dh);
      let dataUrl = tmp.toDataURL('image/png');
      if (((dataUrl.length - 22) * 0.75) > 50 * 1024) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(canvas, Math.floor((targetW - dw) / 2), Math.floor((targetH - dh) / 2), dw, dh);
        dataUrl = tmp.toDataURL('image/jpeg', 0.85);
      }
      return dataUrl;
    } catch (e) {
      return pad.toDataURL('image/png');
    }
  };
})();


// ===== SAMPLE PDF PREVIEW (app-builder only – full hypothetical work order) =====
function makePlaceholderPhoto(label, w, h, bg) {
  try {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = bg || '#0d478c';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    for (let x = 0; x < w; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillText(label, w / 2, h / 2 - 10);
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText('HYPOTHETICAL FIELD EVIDENCE', w / 2, h / 2 + 28);
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText(w + 'x' + h + ' JPEG', w / 2, h / 2 + 56);
    return c.toDataURL('image/jpeg', 0.85);
  } catch (e) {
    return null;
  }
}

function drawFakeSignature(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return false;
  try {
    if (typeof window.initSignatures === 'function') window.initSignatures();
  } catch (e) {}
  const pads = window.sigPads || {};
  const pad = pads[canvasId];
  try {
    // Ensure non-zero canvas buffer
    if (!canvas.width || !canvas.height) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const w = canvas.offsetWidth || 300;
      const h = 150;
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    }
    const ctx = canvas.getContext('2d');
    if (pad && typeof pad.clear === 'function') {
      try { pad.clear(); } catch (e) {}
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const w = canvas.width;
    const h = canvas.height;
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = Math.max(2.5, w / 180);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const sx = w * 0.1;
    const sy = h * 0.55;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(sx + w * 0.1, sy - h * 0.4, sx + w * 0.2, sy + h * 0.3, sx + w * 0.32, sy - h * 0.05);
    ctx.bezierCurveTo(sx + w * 0.42, sy - h * 0.35, sx + w * 0.52, sy + h * 0.25, sx + w * 0.62, sy);
    ctx.bezierCurveTo(sx + w * 0.7, sy - h * 0.2, sx + w * 0.78, sy + h * 0.12, sx + w * 0.88, sy - h * 0.05);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(sx, sy + h * 0.2);
    ctx.quadraticCurveTo(sx + w * 0.4, sy + h * 0.28, sx + w * 0.85, sy + h * 0.15);
    ctx.stroke();
    // Sync SignaturePad so isEmpty() is false
    if (pad && typeof pad.fromDataURL === 'function') {
      try { pad.fromDataURL(canvas.toDataURL('image/png')); } catch (e) {}
    }
    return true;
  } catch (e) {
    console.warn('drawFakeSignature', canvasId, e);
    return false;
  }
}

function setField(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = val;
  el.classList.remove('field-error');
  try {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (e) {}
}

window.previewSamplePDF = async function previewSamplePDF() {
  const statusEl = document.getElementById('builder-test-status');
  const btn = document.getElementById('btn-preview-pdf');
  const setStatus = (msg) => {
    if (statusEl) statusEl.textContent = msg;
    console.log('[BuilderTest]', msg);
  };

  if (btn) btn.disabled = true;
  try {
    setStatus('1/6 Loading hypothetical job data…');

    const today = new Date().toISOString().slice(0, 10);
    const samples = {
      'wo-number': 'WO-PREVIEW-2026-001',
      'doc-date': today,
      'wo-status': 'COMPLETED',
      'client-name': 'Ainushamsi Energy Limited',
      'site-name': 'Pumwani Service Station',
      'site-contact': 'James Otieno - Station Manager',
      'site-address': 'Nairobi, Jogoo Road, Pumwani Estate - adjacent to City Stadium roundabout',
      'equip-id': 'DISP-002',
      'equip-category': 'Fuel Dispenser',
      'equip-desc': 'Retail Fuel Dispenser - Diesel Side (Gilbarco Encore)',
      'equip-mfr': 'Gilbarco',
      'equip-serial': 'GB-EN-88421',
      'product-handled': 'Automotive Diesel (AGO)',
      'equip-location': 'Island 2 / Position No. 002',
      'work-type': 'Diagnosis & On-Site Corrective Repair + Calibration Verification',
      'reported-problem': 'Client reported slow delivery on diesel nozzle and suspected meter drift beyond +/-0.5% tolerance during routine shift check.',
      'work-date': today,
      'tech-lead': 'Samuel Kariuki - Lead Technician (FSW)',
      'tech-assist': 'Peter Mwangi - Assist Technician',
      'final-status': 'REPAIRED AND RETURNED TO SERVICE',
      'final-status-text': 'The dispenser has been functionally tested, leak-checked, and is hereby declared REPAIRED AND RETURNED TO SERVICE in a safe, accurate, and commercially usable condition.',
      'client-rep-name': 'James Otieno',
      'client-rep-title': 'Station Manager',
      'client-comments': 'Work explained and accepted. Dispenser returned to service in my presence.',
      'sig-tech-name': 'Samuel Kariuki',
      'sig-tech-date': today,
      'sig-client-date': today,
      'sig-client-time': '14:35'
    };
    Object.keys(samples).forEach(function (id) { setField(id, samples[id]); });

    const woDisp = document.getElementById('wo-number-display');
    if (woDisp) woDisp.textContent = samples['wo-number'];
    const woDate = document.getElementById('wo-date-display');
    if (woDate) woDate.textContent = today;
    const woStat = document.getElementById('wo-status-display');
    if (woStat) woStat.textContent = 'COMPLETED';

    setStatus('2/6 Auto-populating JHA, scope, QC, parts…');
    if (typeof window.runAutoPopulate === 'function') {
      try {
        window.runAutoPopulate();
      } catch (e) {
        console.warn('runAutoPopulate error', e);
        setStatus('Auto-populate warning: ' + (e.message || e) + ' — continuing…');
      }
    } else {
      setStatus('runAutoPopulate missing — filling narrative fields manually…');
      setField('safety-declaration', 'I confirm that the Job Hazard Analysis was completed and all controls were implemented before work commenced.');
      setField('scope-summary', 'Diagnosis, corrective repair and calibration verification of diesel dispenser DISP-002 under controlled LOTO conditions.');
      setField('scope-steps', '1. Site arrival and toolbox talk.\n2. Isolation and LOTO.\n3. Diagnosis of meter accuracy.\n4. Replacement of flowmeter and seals.\n5. Calibration and functional test.\n6. Documentation and handover.');
      setField('findings-arrival', 'Team arrived, induction completed, work zone established.');
      setField('findings-diagnosis', 'As-found accuracy outside tolerance. Flowmeter wear confirmed.');
      setField('findings-rootcause', 'Worn flowmeter measuring element causing progressive under-delivery.');
      setField('findings-action', 'OEM-spec flowmeter installed, seals renewed, electrical interface verified, accuracy restored.');
      setField('findings-verification', 'Leak test and accuracy test passed. Equipment released for service.');
    }

    setStatus('3/6 Embedding hypothetical photos…');
    if (window.state) {
      const p1 = makePlaceholderPhoto('AS-FOUND Nameplate', 1280, 720, '#0d478c');
      const p2 = makePlaceholderPhoto('AS-LEFT Nozzle Test', 1280, 720, '#1a7346');
      window.state.photos = [];
      if (p1) window.state.photos.push({ id: 'ph_preview_1', name: 'as-found_meter_nameplate.jpg', dataUrl: p1, bytes: 280000 });
      if (p2) window.state.photos.push({ id: 'ph_preview_2', name: 'as-left_nozzle_test.jpg', dataUrl: p2, bytes: 310000 });
      if (typeof window.renderPhotos === 'function') {
        try { window.renderPhotos(); } catch (e) { console.warn(e); }
      }
    }

    setStatus('4/6 Applying hypothetical signatures…');
    if (typeof window.showStep === 'function') window.showStep(8);
    await new Promise(function (r) { setTimeout(r, 400); });
    if (typeof window.initSignatures === 'function') {
      try { window.initSignatures(); } catch (e) { console.warn(e); }
    }
    await new Promise(function (r) { setTimeout(r, 250); });
    drawFakeSignature('sig-tech');
    drawFakeSignature('sig-assist');
    drawFakeSignature('sig-client');

    setStatus('5/6 Building review…');
    if (typeof window.showStep === 'function') window.showStep(9);
    if (typeof window.buildReview === 'function') {
      try { window.buildReview(); } catch (e) { console.warn(e); }
    }
    await new Promise(function (r) { setTimeout(r, 250); });

    setStatus('6/6 Generating full multi-page PDF…');
    if (typeof window.generatePDF !== 'function') {
      throw new Error('generatePDF is not available on window');
    }
    await window.generatePDF();
    setStatus('Done. Full hypothetical PDF generated and downloaded. Check all pages.');
    if (typeof window.toast === 'function') window.toast('Test PDF generated successfully', 'success');
  } catch (err) {
    console.error('previewSamplePDF failed', err);
    setStatus('FAILED: ' + (err && err.message ? err.message : String(err)));
    if (typeof window.toast === 'function') window.toast('Test PDF failed: ' + (err && err.message ? err.message : err), 'error');
    else alert('Test PDF failed: ' + (err && err.message ? err.message : err));
  } finally {
    if (btn) btn.disabled = false;
  }
};

// ===== HQ SUBMISSION + OFFLINE QUEUE (fused from client-sync.js) =====
(function () {
  'use strict';

  const QUEUE_KEY = 'forecourt_offline_queue';
  const ENDPOINT_URL = 'https://submit.forecourtworks.co.ke/receiver.php';
  const APP_TOKEN = ''; // Optional: set X-App-Token if server enforces it

  function collectWorkOrderPayload() {
    const fields = {};
    document.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.id) {
        fields[el.id] = el.type === 'checkbox' ? el.checked : el.value;
      }
    });

    // Structured nested data for hazards, QC, parts
    const hazards = [];
    document.querySelectorAll('#hazards-container > div').forEach(node => {
      const h = node.querySelector('.haz-hazard');
      if (!h) return;
      hazards.push({
        hazard: h.value || '',
        risk: (node.querySelector('.haz-risk') || {}).value || '',
        control: (node.querySelector('.haz-control') || {}).value || '',
        verified: !!(node.querySelector('.haz-verified') || {}).checked
      });
    });

    const qcTests = [];
    document.querySelectorAll('#qc-table-container tbody tr').forEach(tr => {
      qcTests.push({
        test: (tr.querySelector('.qc-test') || {}).value || '',
        asFound: (tr.querySelector('.qc-found') || {}).value || '',
        asLeft: (tr.querySelector('.qc-left') || {}).value || '',
        criterion: (tr.querySelector('.qc-crit') || {}).value || '',
        result: (tr.querySelector('.qc-result') || {}).value || ''
      });
    });

    const parts = [];
    document.querySelectorAll('#parts-container > div').forEach(div => {
      parts.push({
        description: (div.querySelector('.part-desc') || {}).value || '',
        qty: (div.querySelector('.part-qty') || {}).value || '',
        serial: (div.querySelector('.part-serial') || {}).value || '',
        warrantyStart: (div.querySelector('.part-wstart') || {}).value || '',
        warrantyEnd: (div.querySelector('.part-wend') || {}).value || ''
      });
    });

    // Signatures (prefer safe JPEG)
    const getSig = (typeof window.getSigDataSafe === 'function')
      ? window.getSigDataSafe
      : (id) => {
          const pad = (typeof sigPads !== 'undefined') ? sigPads[id] : null;
          return pad && !pad.isEmpty() ? pad.toDataURL('image/png') : null;
        };

    const signatures = {
      leadTech: getSig('sig-lead'),
      assistTech: getSig('sig-assist'),
      client: getSig('sig-client')
    };

    // Photos – keep dataURLs but note size; server stores base64 of whole payload
    const photos = (window.state && window.state.photos) ? window.state.photos.map(p => ({
      id: p.id,
      name: p.name,
      dataUrl: p.dataUrl
    })) : [];

    const woId = (document.getElementById('wo-number') || {}).value || ('WO-' + Date.now());

    return {
      version: 2,
      work_order_id: woId,
      submitted_at: new Date().toISOString(),
      device_online: navigator.onLine,
      fields,
      hazards,
      qcTests,
      parts,
      signatures,
      photos,
      meta: {
        app: 'FSW Technical Service Work Order',
        source: 'field-app',
        userAgent: navigator.userAgent
      }
    };
  }

  function setSubmitStatus(msg, type) {
    const el = document.getElementById('submit-status');
    if (!el) return;
    el.textContent = msg;
    el.style.color = type === 'success' ? '#1a7346' : type === 'error' ? '#b91c1c' : type === 'warning' ? '#d9730d' : '#0d478c';
  }

  function saveToOfflineQueue(data) {
    let queue = [];
    try {
      queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    } catch (_) {}
    queue.push({ data, timestamp: Date.now() });
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.warn('Queue storage full', e);
    }
  }

  async function transmitData(payload) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const headers = { 'Content-Type': 'application/json' };
    if (APP_TOKEN) headers['X-App-Token'] = APP_TOKEN;

    try {
      const response = await fetch(ENDPOINT_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || ('Server error ' + response.status));
      }
      return result;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  async function submitWorkOrderToHQ() {
    const btn = document.getElementById('btn-submit-hq');
    if (btn) btn.disabled = true;

    const payload = collectWorkOrderPayload();
    if (!payload.work_order_id) {
      setSubmitStatus('Missing Work Order number', 'error');
      if (btn) btn.disabled = false;
      return;
    }

    if (!navigator.onLine) {
      saveToOfflineQueue(payload);
      setSubmitStatus('Offline: Work order queued. Will auto-sync when connection returns.', 'warning');
      if (typeof toast === 'function') toast('Saved to offline queue', 'warning');
      if (btn) btn.disabled = false;
      return { status: 'queued' };
    }

    setSubmitStatus('Transmitting to HQ…', 'info');
    try {
      const result = await transmitData(payload);
      setSubmitStatus('Submitted successfully. HQ notified. Pending review.', 'success');
      if (typeof toast === 'function') toast('Work Order submitted to HQ', 'success');
      // Clear any prior queue entry for this WO if present
      return result;
    } catch (error) {
      saveToOfflineQueue(payload);
      setSubmitStatus('Network error: Queued for retry. ' + (error.message || ''), 'error');
      if (typeof toast === 'function') toast('Queued offline for retry', 'error');
      throw error;
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  // Auto-sync on reconnect
  window.addEventListener('online', async () => {
    let queue = [];
    try {
      queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    } catch (_) {}
    if (queue.length === 0) return;

    setSubmitStatus('Connection restored. Syncing pending work orders…', 'info');
    if (typeof toast === 'function') toast('Syncing offline queue…', 'info');

    const remaining = [];
    for (const item of queue) {
      try {
        await transmitData(item.data);
      } catch (e) {
        remaining.push(item);
      }
    }
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
    if (remaining.length === 0) {
      setSubmitStatus('All offline work orders synced successfully.', 'success');
      if (typeof toast === 'function') toast('Offline queue cleared', 'success');
    } else {
      setSubmitStatus(remaining.length + ' work order(s) still pending sync.', 'warning');
    }
  });

  // Wire button + expose after PDF generation
  function wireSubmitButton() {
    const btn = document.getElementById('btn-submit-hq');
    if (btn) {
      btn.addEventListener('click', () => {
        submitWorkOrderToHQ().catch(() => {});
      });
    }
  }

  // Show submit button once PDF has been generated (or always after review)
  const origGenerate = window.generatePDF;
  // Hook into existing generatePDF success path via mutation observer or re-bind after load
  document.addEventListener('DOMContentLoaded', () => {
    wireSubmitButton();
    // Make submit visible after PDF button is used
    const genBtn = document.getElementById('btn-generate-pdf');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        // After a short delay (PDF generation starts), reveal submit
        setTimeout(() => {
          const sBtn = document.getElementById('btn-submit-hq');
          if (sBtn) sBtn.style.display = 'inline-flex';
        }, 1500);
      });
    }
    // Also expose submit earlier so tech can submit without PDF if needed
    const sBtn = document.getElementById('btn-submit-hq');
    if (sBtn) sBtn.style.display = 'inline-flex';
  });

  // Expose for debugging / external call
  window.FSW = window.FSW || {};
  window.FSW.collectWorkOrderPayload = collectWorkOrderPayload;
  window.FSW.submitWorkOrderToHQ = submitWorkOrderToHQ;
})();
