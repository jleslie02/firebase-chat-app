export const alerts = {
  //  type: alert type (error, warning, success, info)
  //  msg: the alert message
  //  timeout: seconds before alert disappears, or 0 for no disappearing behavior
  //  priority: since only one message is shown (currently), higher-priority messages will be shown over lower-priority
  alert: (id, type, msg, timeout = 6, priority = 0) => {
    let newID = id || `alert-${Math.round(Math.random() * 99999999)}`;
    let format = false;
    let messageValues = {};
    if (typeof msg === 'object' && msg.id) {
      format = true;
      messageValues = msg.values || {};
      msg = msg.id;
    }
    return {type, message: msg, timeout, priority, id: newID, format, messageValues};
  },
  error: (id, msg, timeout, priority = 3) => alerts.alert(id, 'error', msg, timeout, priority),
  warning: (id, msg, timeout, priority = 3) => alerts.alert(id, 'warning', msg, timeout, priority),
  info: (id, msg, timeout, priority = 2) => alerts.alert(id, 'info', msg, timeout, priority),
  success: (id, msg, timeout, priority = 2) => alerts.alert(id, 'success', msg, timeout, priority)
};
