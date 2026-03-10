"use client";

import { Render, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig } from "@/lib/puck.config";

/**
 * Convert zone-based data into inline slot props so Puck's <Render> can
 * resolve slot fields correctly. Puck stores slot children in
 * `data.zones["componentId:slotName"]` but <Render> reads from
 * `item.props[slotName]`. This function merges zones back into props
 * recursively.
 */
function inlineZones(data: Data): Data {
  if (!data.zones || Object.keys(data.zones).length === 0) return data;

  const zones = { ...data.zones };

  // Build a map of componentId → { slotName: items[] }
  const slotMap: Record<string, Record<string, Data["content"]>> = {};
  for (const [zoneKey, items] of Object.entries(zones)) {
    const sepIdx = zoneKey.indexOf(":");
    if (sepIdx === -1) continue;
    const compId = zoneKey.slice(0, sepIdx);
    const slotName = zoneKey.slice(sepIdx + 1);
    if (!slotMap[compId]) slotMap[compId] = {};
    slotMap[compId][slotName] = items;
  }

  // Recursively inline zone content into item props
  function processItems(items: Data["content"]): Data["content"] {
    return items.map((item) => {
      const slots = slotMap[item.props.id];
      if (!slots) return item;

      const newProps = { ...item.props };
      for (const [slotName, children] of Object.entries(slots)) {
        // Recursively process children too (nested slots)
        newProps[slotName] = processItems(children);
      }
      return { ...item, props: newProps };
    });
  }

  return {
    ...data,
    content: processItems(data.content),
    // Keep zones for backward compat but they're now also inlined
    zones,
  };
}

export default function InviteClient({ data }: { data: Data }) {
  return <Render config={puckConfig} data={inlineZones(data)} />;
}
