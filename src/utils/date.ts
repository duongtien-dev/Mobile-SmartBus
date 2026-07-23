/** Parse DD/MM/YYYY → ISO midnight UTC */
export function parseDdMmYyyyToIso(value: string): string | null {
    const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return null;
    const [, dd, mm, yyyy] = match;
    const iso = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
    if (Number.isNaN(new Date(iso).getTime())) return null;
    return iso;
}

/** Parse MM/YYYY → ISO first day of month UTC */
export function parseMmYyyyToIso(value: string): string | null {
    const match = value.trim().match(/^(\d{2})\/(\d{4})$/);
    if (!match) return null;
    const [, mm, yyyy] = match;
    const iso = `${yyyy}-${mm}-01T00:00:00.000Z`;
    if (Number.isNaN(new Date(iso).getTime())) return null;
    return iso;
}
