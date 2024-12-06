import DataTable, { TableColumn } from "react-data-table-component";
import { useColor } from "../../../context/ColorContext";
import { NavBar } from "../../../components/NavBar";
import { CustomOutlineButton } from "../../../components/CustomOutlineButton";
import { Footer } from "../../../components/Footer";
import { SelectFilter } from "../../../components/SelectFilter";
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { Ads } from "../../../helpers/Types";
import { customStyles } from "../../../components/CustomStylesDataTable";
import { adsFields } from "../../../helpers/Fields";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const NledAdsLogs = () => {
    const { navbarColor, footerColor } = useColor();
    const [logs, setlogs] = useState<Ads[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [filters, setFilters] = useState<Record<string, string>>({});

    // Função para buscar os logs
    const fetchAllAds = async () => {
        try {
            const data = await apiService.fetchAllAds();
            setlogs(data);
        } catch (error) {
            console.error('Erro ao buscar os dados das publicidades:', error);
        }
    };

    // Busca os logs ao carregar a página
    useEffect(() => {
        fetchAllAds();
    }, []);

    // Função para atualizar os logs
    const refreshAds = () => {
        fetchAllAds();
    };

    // Opções de paginação da tabela com troca de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas da tabela
    const columns: TableColumn<Ads>[] = adsFields
        .filter(field => ['creador', 'createDate', 'updateDate'].includes(field.key))
        .map(field => {
            const formatField = (row: Ads) => {
                switch (field.key) {
                    case 'createDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    case 'updateDate':
                        return new Date(row[field.key]).toLocaleString() || '';
                    default:
                        return row[field.key] || '';
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={logs} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredDataTable = logs.filter(log =>
        Object.keys(filters).every(key =>
            filters[key] === "" || (log[key] != null && String(log[key]).toLowerCase().includes(filters[key].toLowerCase()))
        ) &&
        Object.values(log).some(value => {
            if (value == null) {
                return false;
            } else if (value instanceof Date) {
                return value.toLocaleString().toLowerCase().includes(filterText.toLowerCase());
            } else {
                return value.toString().toLowerCase().includes(filterText.toLowerCase());
            }
        })
    );

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Logs de Publicidades</span>
                </div>
                <div className="datatable-header">
                    <div>
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Pesquisa"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                    <div className="buttons-container-others">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Atualizar</Tooltip>}
                        >
                            <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAds} />
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='table-css'>
                    <DataTable
                        columns={columns}
                        data={filteredDataTable}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={20}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                        defaultSortAsc={true}
                        defaultSortFieldId="createDate"
                    />
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}