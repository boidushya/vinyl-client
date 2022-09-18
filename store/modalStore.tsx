import React, {
	useState,
	createContext,
	useMemo,
	useContext,
	ReactNode,
} from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

interface ModalContextType {
	showModal: (children: ReactNode) => void;
	hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
	showModal: () => {},
	hideModal: () => {},
});

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [component, setComponent] = useState<ReactNode>(null);

	const showModal = (children: ReactNode) => {
		setComponent(children);
		setOpen(true);
	};

	const hideModal = () => {
		setOpen(false);
		setComponent(null);
	};

	const value = useMemo(
		() => ({
			showModal,
			hideModal,
		}),
		[]
	);

	const modalStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
		overlay: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.55)",
		},
	};

	return (
		<ModalContext.Provider value={value}>
			{children}
			<Modal
				isOpen={open}
				style={{
					content: {
						maxWidth: "800px",
						minWidth: "400px",
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
						borderRadius: "12px",
						outline: "none",
						padding: "20px",
						border: "2px solid #404065",
						background: "#27273E",
					},
					overlay: {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.75)",
					},
				}}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
				onRequestClose={hideModal}
			>
				<div id="defaultModal" aria-hidden="true">
					{/* <div className="p-4 flex justify-end items-center">
						<button
							onClick={hideModal}
							type="button"
							className="rounded-lg text-lg ml-auto inline-flex items-center"
							data-modal-toggle="defaultModal"
						>
							<IoMdClose />
						</button>
					</div> */}

					<div className="p-4">{component}</div>
				</div>
			</Modal>
		</ModalContext.Provider>
	);
};

const useModal = () => {
	return useContext(ModalContext);
};

export default useModal;
