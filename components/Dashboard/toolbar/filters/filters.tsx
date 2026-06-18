import { Input } from "@/components/ui/input/input";
import { Select } from "@/components/ui/select/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
	selectCategory,
	selectSearch,
	selectStatus,
} from "@/store/selectors/projectsDashboard.selectors";
import { setCategory, setSearch, setStatus } from "@/store/slices/projectsDashboardSlice";
import {
	CATEGORY_KEYS,
	type ProjectCategory,
	type ProjectStatus,
	STATUS_KEYS,
} from "@/types/project.types";
import styles from "./filters.module.scss";

const isCategoryKey = (val: string): val is ProjectCategory =>
	(CATEGORY_KEYS as string[]).includes(val);

const isStatusKey = (val: string): val is ProjectStatus => (STATUS_KEYS as string[]).includes(val);

export const Filters = () => {
	const dispatch = useAppDispatch();
	const search = useAppSelector(selectSearch);
	const category = useAppSelector(selectCategory);
	const status = useAppSelector(selectStatus);

	return (
		<div className={styles.filters}>
			<Input
				tone="secondary"
				variant="search"
				placeholder="Buscar proyecto..."
				value={search}
				onChange={(e) => dispatch(setSearch(e.target.value))}
			/>

			<div>
				<Select
					tone="secondary"
					variant="search"
					options={[
						{ value: "IGLESIA", label: "Iglesia" },
						{ value: "EEC", label: "EEC" },
						{ value: "GJEF", label: "GJEF" },
					]}
					value={category}
					onChange={(val) => {
						if (val === "" || isCategoryKey(val)) dispatch(setCategory(val));
					}}
					placeholder="Todas las categorías"
				/>

				<Select
					tone="secondary"
					variant="search"
					options={[
						{ value: "IN_PROGRESS", label: "En progreso" },
						{ value: "COMPLETED", label: "Completado" },
					]}
					value={status}
					onChange={(val) => {
						if (val === "" || isStatusKey(val)) dispatch(setStatus(val));
					}}
					placeholder="Todos los estados"
				/>
			</div>
		</div>
	);
};
